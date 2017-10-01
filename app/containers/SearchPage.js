import React, { Component } from 'react';
import RoomItem from 'RoomItem'
import {getAllRooms} from 'roomsAPI'
import {connect} from 'react-redux'
import FilterDiv from 'FilterDiv'
import {subscribe} from 'redux-subscriber';
var Loader = require('halogen/PulseLoader');



class SearchPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchedRooms:null,
            searchedRoomsList:[],
            filteredRoomList:[],
            roomsAreLoaded : false

        } ;
        subscribe('setFilters', state => {
                let {searchedRoomsList} = this.state;
                let filteredRoomList = searchedRoomsList.filter((room)=>{
                    return (room.title.indexOf(state.setFilters.title) > -1) && (room.newPrice > state.setFilters.range.min && room.newPrice < state.setFilters.range.max) && room.stars >=  state.setFilters.stars;
                })

                filteredRoomList = filteredRoomList.map((room)=>{
                    return <RoomItem key={room._id} roomObject={room}/> })
                this.setState({filteredRoomList: filteredRoomList});
            });

    }

    componentDidMount(){
        let searchItem = this.props.filterRooms


        getAllRooms(searchItem).then((res)=>{
                this.setState({
                    roomsAreLoaded : true
                })
                let rooms = res.data.rooms
                let {filteredRoomList} = this.state;
                if (rooms.length > 0){
                    this.setState({searchedRoomsList: rooms});

                    filteredRoomList = rooms.map((room)=>{
                        return <RoomItem key={room._id} roomObject={room}/> })
                    this.setState({filteredRoomList: filteredRoomList});
                }
                else{
                    return <div>
                        <Loader color="#EF4836" size="16px" margin="4px"/>

                    </div>
                }

            })
        ;
    }

    render(){
        let {filteredRoomList,roomsAreLoaded} = this.state
        return <div className="row">
            <div className="column large-3">
                <FilterDiv></FilterDiv>
            </div>
            <div className="column large-9">
                <div> {filteredRoomList.length > 0 ? filteredRoomList : roomsAreLoaded ? <div className="empty-search-result"><div><p>Your search had 0 results.</p></div></div>:''} </div>
            </div>
                <div className="page-loader">
                {roomsAreLoaded ? '' : <Loader color="#EF4836" size="16px" margin="4px"/>}
            </div>


        </div>



    }

}
export default connect(
    (state) => {
        return state;
    }
)(SearchPage);;