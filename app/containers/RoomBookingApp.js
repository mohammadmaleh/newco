import React from 'react';
import Header from 'Header'
import HomePage from  'HomePage'
import SignUp from  'SignUp'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchPage from 'SearchPage';
import PostRoomPage from 'PostRoomPage'

export const RoomBookingApp = React.createClass({
    render: ()=>{
        return(
            <BrowserRouter>

               <Switch>
                   <div>
                       <Header/>
                       <Route exact path="/" component={HomePage}/>
                       <Route path="/sign-up" component={SignUp}/>
                       <Route path="/search-page" component={SearchPage}/>
                       <Route path="/post-room" component={PostRoomPage}/>
                   </div>

            </Switch>
            </BrowserRouter>



        )
    }



});
