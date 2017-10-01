/**
 * Created by mohammadmaleh on 29/05/2017.
 */
import React, { Component } from 'react';


import {Link}from 'react-router-dom'



class Header extends Component {
    constructor(props){
        super(props)
        this.state = {


        } ;
        ;
    }
    render () {



        return (
            <div className="header container">
                <div className="">
                    <Link to='/' className="logo" >

                        <img src={require("../assets/images/logo.png")}  alt=""/>
                    </Link>
                    <div className="header-button-group">
                        <div className="sign-in-button float-right">
                            <a  className="btn btn-ghost"  href="#"  >Sign out</a>


                        </div>
                        <div className="sign-in-button float-right">
                            <a  className="btn btn-ghost"  href="#"  >Sign out</a>
                            <button type="button" className="btn btn-success">Save</button>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
export default Header