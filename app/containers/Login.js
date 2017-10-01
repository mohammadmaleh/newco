import React,{Component} from 'react'
import {loginAPI} from 'usersAPI'
import  {saveUserInfo} from 'storage'
import {Link} from 'react-router-dom'

 export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            errorMessage:'',
            logedIn:false
        }
        this.login = this.login.bind(this)
    }
    login(){

        let{username,password} = this.state
        loginAPI(username,password)
            .then((res)=>{
                saveUserInfo({
                    username:res.data.username,
                    id:res.data._id,
                    token:res.headers['x-auth'],
                })
                this.props.history.push('/home-page');

            })
            .catch((e)=>{
                this.setState({
                    errorMessage:'Wrong Username or password'
                })
            })
    }
    handleFormChange = (event) => {
        this.setState({errorMessage:''})
        event.preventDefault()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
        return false
    }

    render(){
        return(
            <div>
                <div className="main-container">
                    <div className="login-container">
                        <div className="logo-container">
                            <img src={require('../assets/images/logo.png')} alt=""/>

                        </div>
                        <div className="error-message">
                            <p>{this.state.errorMessage}</p>
                        </div>
                        <div className="login-control">
                            <span className="fa fa-user"></span>

                            <input type="text" name="username" placeholder="Email" value={this.state.username} onChange={this.handleFormChange} />
                        </div>
                        <div className="login-control">
                            <span className="fa fa-lock"></span>

                            <input type="password"  name="password" placeholder="Password" value={this.state.password} onChange={this.handleFormChange} />
                        </div>
                        <div className="login-button-container">
                            <a  to={'/home-page'} className="login-button" onClick={this.login} >Log in</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
