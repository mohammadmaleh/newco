
// import React from 'react';
// import ReactDOM from 'react-dom'
// import {RoomBookingApp} from 'RoomBookingApp'
// require('font-awesome/css/font-awesome.css');
// var {Provider}=  require('react-redux');
// var actions = require('actions')ƒ
// var store = require('configuer.store').config()

// ReactDOM.render(
// <Provider store={store}  >
//     <RoomBookingApp></RoomBookingApp>
//     </Provider> ,
//     document.getElementById('app')
// )

import { Switch,Route } from 'react-router-dom';
import {RoutePaths} from 'Routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Login from './containers/Login'
import HomePage from './containers/HomePage'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

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


require("font-awesome-sass-loader");
require('style-loader!css-loader!sass-loader!./styles/app.scss')
