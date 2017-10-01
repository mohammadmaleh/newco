/**
 * Created by mohammadmaleh on 29/05/2017.
 */
import React, { Component } from 'react';

var Modal = require('boron/DropModal');
var {connect} =   require('react-redux');
import {loginAPI} from 'usersAPI'
import{loginUser,openModal,closeModal} from 'actions'
class SignInButton extends Component {
    constructor(props){
        super(props)
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    handleSignIn (e){
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
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
    }
    handleOpenModal () {
        var {dispatch} =  this.props;
        dispatch(openModal())
    }

    handleCloseModal () {
        var {dispatch} =  this.props;
        dispatch(closeModal())

    }
    showModal(){
        this.refs.modal.show();
    }
    hideModal(){
        this.refs.modal.hide();
    }

    render () {
        const modalStyle = {
            padding:"0 125px"
        }
        return (
            <div className="sign-in-button">
                <a  className="btn btn-ghost"  href="#"  onClick={this.showModal}>Sign in</a>
                <Modal ref="modal"   style={modalStyle}>
                    <div className="circle">
                        <img src={require('../assets/images/logo.png')} alt=""/>

                    </div>
                    <form action="">
                    <label htmlFor="email" > Email</label>
                    <input type="text" ref="email" name="email"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" ref="password"/>
                    <a className="btn btn-full" href="#" onClick={this.handleSignIn}>Sign In</a>
                    <a className="btn btn-full float-right"  href="#" onClick={this.hideModal}>cancel</a>
                    </form>
                </Modal>

            </div>

        )
    }
};
export default connect(
    (state) => {
        return state;
    }
)(SignInButton);;
