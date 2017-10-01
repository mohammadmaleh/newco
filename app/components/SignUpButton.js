/**
 * Created by mohammadmaleh on 29/05/2017.
 */
var React = require('react');

import {Link}from 'react-router-dom'
var SignUpButton = React.createClass({

    render: function () {
        return (
           <div className="sign-up-button">
               <Link to="/sign-up" className="btn btn-full">Sign up</Link>
           </div>
        )
    }
});
module.exports = SignUpButton;