import React,{Component} from 'react'

import DatePicker from 'react-datepicker';
var Typeahead = require('react-typeahead').Typeahead;
import moment from 'moment';
var {connect} = require('react-redux')
var actions = require('actions');
import {Link} from 'react-router-dom'

class HomePageSearchBox extends Component{
    constructor (props) {
        super(props)
        this.filterValues = {
            availableTo:moment().startOf('day').add(1,'Day'),
            availableFrom: moment().startOf('day'),
            capacity:"Any",
            city:""

        }
        this.handleAttendance = this.handleAttendance.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeAvailableTo = this.handleChangeAvailableTo.bind(this)
        this.handleChangeAvailableFrom = this.handleChangeAvailableFrom.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleCity = this.handleCity.bind(this)
        this.state = {
            availableTo:moment().startOf('day').add(1,'Day'),
            availableFrom: moment().startOf('day'),
            capacity:"Any",
            city:""
        }

    }

    handleAttendance (e) {


        this.setState({capacity:e.target.value})
    }
    handleKeyPress(e){
        if(e.charCode==13){
            alert('Enter clicked!!!');
        }
    }
    handleSubmit (e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        var {dispatch} =  this.props;
        let {availableTo,availableFrom, capacity,city} = this.state
        dispatch(actions.FilterRooms({
            capacity,
            city,
            availableTo:availableTo.unix(),
            availableFrom:availableFrom.unix()
        }))
    }
    handleChangeAvailableFrom(date){
        this.setState({
            availableFrom: date
        });
    }
    handleChangeAvailableTo(date){
        this.setState({
            availableTo: date
        });
    }
    handleCity(e){

        this.setState({city:e.target.value})



    }
    render () {

        return(
            <div className="home-page-search-box">
                <h3 className="search-box-header">
                    1000+ Rooms are waiting for you
                </h3>
                <form className="search-box row">
                    <div className="column large-3 main-search-box-item">
                        <p>where would you like to go ?</p>
                        {/*<Typeahead*/}
                            {/*onOptionSelected={this.handleCity}*/}
                            {/*options={['istanbul', 'berlin', 'urfa', 'Ringo']}*/}
                            {/*maxVisible={2}*/}
                        {/*/>*/}
                        <input type="text" onChange={this.handleCity} onKeyPress={this.handleKeyPress} autoFocus/>
                    </div>
                    <div className="column large-2 main-search-box-item">
                        <p>Check in</p>
                        <DatePicker
                            selected={this.state.availableFrom}
                            selectsStart
                            startDate={this.state.availableFrom}
                            endDate={this.state.availableTo}
                            onChange={this.handleChangeAvailableFrom}

                        />
                    </div>
                    <div className="column large-2 main-search-box-item">
                        <p>Check out</p>
                        <DatePicker
                            selected={this.state.availableTo}
                            selectsEnd
                            startDate={this.state.availableFrom}
                            endDate={this.state.availableTo}
                            onChange={this.handleChangeAvailableTo}
                        />

                    </div>
                    <div className="column large-2 main-search-box-item">
                        <p>Attendance</p>
                        <select value={this.filterValues.capacity}  onChange={this.handleAttendance} ref="attendance">
                            <option value="Any">Any</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>

                    </div>
                    <div className="column large-2 main-search-box-item">
                        <Link to='/search-page' className="btn btn-full" onClick={this.handleSubmit}>Search</Link>
                    </div>

                </form>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return state;
    }
)(HomePageSearchBox);
