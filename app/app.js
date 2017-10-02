import { Switch,Route } from 'react-router-dom';
import {RoutePaths} from 'Routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Login from './containers/Login'
import HomePage from './containers/HomePage'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require("font-awesome-sass-loader");
require('style-loader!css-loader!sass-loader!./styles/app.scss')


window.$ = window.jQuery = require("jquery");
ReactDOM.render(
    <BrowserRouter>

        <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/home-page" component={HomePage}/>

        </Switch>
    </BrowserRouter>

    ,
    document.getElementById('app')
);


//
