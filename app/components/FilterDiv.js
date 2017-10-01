import React, { Component } from 'react';
import {connect} from 'react-redux'
import InputRange from 'react-input-range';
import StarRatingComponent from 'react-star-rating-component';
import {setFilters} from 'actions'



class FilterDiv extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title:'',
            stars : 0,
            range: {
                min: 100,
                max: 2999,
            },
        };

    }
    handleChange(){
        let filterObject = {}
        filterObject.filterTitle = this.refs.title.value

        filterObject.filterRange = this.state.range
        filterObject.filterStars = this.state.stars
        let {dispatch} = this.props;
        dispatch(setFilters(filterObject))

    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({stars : nextValue});
        setTimeout(()=>{
            this.handleChange();

        },10)
    }
    render(){
        return <div className="filter-div">
           <div className=" filter-item">
               <h4>Search within results</h4>
               <input type="text"  ref="title" onChange={this.handleChange}  />
           </div>
            <div className=" filter-item">
                <h4>price per night</h4>
                <InputRange
                    maxValue={3000}
                    minValue={0}
                    formatLabel={value => `${value} TL`}
                    value={this.state.range}
                    onChange={value => this.setState({ range: value })}
                    onChangeComplete={value => {this.handleChange()}} />
            </div>
            <div className=" filter-item">
                <h4>min star rate</h4>
                <div className="room-stars">
                    <StarRatingComponent
                        name={'rateFilter'}
                        starCount={5}
                        value={this.state.stars}
                        onStarClick={this.onStarClick.bind(this)}
                    />

                </div>
            </div>
        </div>
    }

}
export default connect(
    (state) => {
        return state;
    }
)(FilterDiv);;