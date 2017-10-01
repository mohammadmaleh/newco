import React,{Component} from 'react'
import {signUpAPI,loginAPI} from 'usersAPI'
import NotificationSystem from 'react-notification-system';

import {loginUser} from 'actions';
import {connect} from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';

let notificationOpts = {
    title: '',
    message: '',
    position: 'tr',
    autoDismiss: 2,

};
class SignUp extends Component{
    constructor(props){
        super(props)
        this.notificationSystem=null;

        this.state = {
            email:'',
            password:'',
            username:"",
            validationStyle:{
                username:'',
                email:'',
                password:''
            }

        }
        this.validation = this.validation.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }
    addNotification(notificationOpts) {
        this.notificationSystem.addNotification({
            message: notificationOpts.message,
            level: notificationOpts.title.toLowerCase(),
            title:notificationOpts.title,
            position: 'tr',
            autoDismiss: 2,


        });
    }

    handleSubmit(e){
        e.preventDefault();
        let {email,password,username}= this.state
        if (this.validation()){
            signUpAPI(email,password,username)
            .then((res)=>{
                notificationOpts.title = "Success"
                notificationOpts.message = "Welcome, Enjoy finding your new room"
                this.addNotification(notificationOpts)


                loginAPI(email,password)
                    .then((res)=>{
                        var {dispatch} =  this.props;
                        dispatch(loginUser({
                            username:res.data.username,
                            email:res.data.email,
                            _id:res.data._id,
                            token:res.headers['x-auth'],
                        }))

                })



            }).catch((error)=>{
                notificationOpts.title = "Error"
                if (error.response.data.errmsg)
                    notificationOpts.message = error.response.data.errmsg
                else if (error.response)
                    notificationOpts.message = error.response.data.message
                 else
                    notificationOpts.message = error.message

                this.addNotification(notificationOpts)


            })


        }


    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    validation(){
        let {email,username,password} = this.state
        let validEmail =  validator.isEmail(email);
        let validUsername = validator.isLength(username,{min:3, max: undefined})
        let validPassword = validator.isLength(password,{min:6, max: undefined})
        notificationOpts.title = "Error"
        notificationOpts.message = ''

        if(!validPassword){
            notificationOpts.message = 'Password is too short! at least 6  characters are required'
            this.addNotification(notificationOpts)
        }

        if (!validEmail){
            notificationOpts.message = 'Email is not valid! please enter a valid email'
            this.addNotification(notificationOpts)
        }
        if(!validUsername){
            notificationOpts.message = 'Username is too short! at least 3  characters are required'
            this.addNotification(notificationOpts)

        }

        this.setState({
            validationStyle: {
                email: validEmail ? '' : 'red',
                username: validUsername ? '' : 'red',
                password: validPassword ? '' : 'red'
            }
        })
        return validPassword && validEmail && validUsername

    }
    render(){
        const {notifications} = this.props;
        let {validationStyle} =this.state;
        return(
            <div className="sign-up-page">
                <div className="circle">
                    <img src={require('../assets/images/logo.png')} alt=""/>

                </div>
                <form action="" >
                    <label htmlFor="email">Username</label>
                    <input type="text" name="username"  onChange={this.handleInputChange}
                           style={{borderColor:validationStyle.username}}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" ref='email'  onChange={this.handleInputChange}
                           style={{borderColor:validationStyle.email,transaction:'border-color 0.5s'}}/>
                    <label htmlFor="password" >Password:</label>
                    <input type="password" name="password" ref='password'  onChange={this.handleInputChange}
                           style={{borderColor:validationStyle.password,transaction:'border-color 0.5s'}}/>
                    <a  className="btn btn-full float-center    " href="#" onClick={this.handleSubmit}
                        >Sign Up</a>
                </form>
                <NotificationSystem ref="notificationSystem" />


            </div>
        )
    }
}
SignUp.contextTypes = {
    store: PropTypes.object
};

SignUp.propTypes = {
    notifications: PropTypes.array
};

export default connect(
    state => ({ notifications: state.notifications })
)(SignUp);
