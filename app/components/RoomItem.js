import React,{Component} from'react'
import StarRatingComponent from 'react-star-rating-component';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import NotificationSystem from 'react-notification-system';



var Modal = require('boron/DropModal');

let notificationOpts = {
    title: '',
    message: '',
};


const base64_arraybuffer = require('base64-arraybuffer')
var modalStyle = {
    width: '80%'
};
class RoomItem extends Component{
    constructor(props){

        super(props);
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.handleChangeAvailableTo = this.handleChangeAvailableTo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeAvailableFrom = this.handleChangeAvailableFrom.bind(this)
        this.addNotification= this.addNotification.bind(this)

        this.state = {
            availableTo:moment().startOf('day').add(1,'Day'),
            availableFrom: moment().startOf('day'),
        }
        this.notificationSystem=null;



        this.room =  {
            title : 'Room in istanbul',
            description:'saSAsas',
            mainImage : 'https://st.hzcdn.com/fimgs/e7a192a501fdd299_6059-w500-h400-b0-p0--.jpg',
            stars:5,
            reviewsCount:18,
            rate:9.3,
            oldPrice:1200,
            newPrice:1000,
            offersWifi:true ,
            city:'istanbul',
            street:'caglayan',
            capacity : 2 ,
            favorite:true,
            size:89,
            equipment:['','','',''],


        }
    }
    addNotification(notificationOpts) {
        this.notificationSystem.addNotification({
            message: notificationOpts.message,
            level: notificationOpts.title.toLowerCase(),
            title:notificationOpts.title,
            position: 'tr',
            autoDismiss: 4,


        });
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }
    showModal(){
        this.refs.modal.show();
    }
    hideModal(){
        this.refs.modal.hide();
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
    hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }
    handleSubmit(){
        this.hideModal()
        notificationOpts.title = 'Success'
        notificationOpts.message = 'Your room is successfully booked!!'
        this.addNotification(notificationOpts)
    }
    render(){

        let {roomObject} = this.props;
        // let base64String = btoa(String.fromCharCode(...new Uint8Array(roomObject.mainImage.data.data)));
        console.log(roomObject)
        let image =base64_arraybuffer.encode(roomObject.mainImage.data.data)
        return(
            <div className="row room-item " onClick={this.showModal}>
                <div className="column large-3 small-12 room-item-image" >
                    <img src={"data:image/png;base64,"+image}/>
                </div>
                <div className=" column large-6 small-6 room-item-main">
                    <p className="room-item-title">
                        {roomObject.title}
                    </p>

                    <div className="room-item-stars">
                        <StarRatingComponent
                            name={'rate'+roomObject._id}
                            starCount={5}
                            value={1}
                        />

                    </div>
                    <div className="room-item-location">
                        {roomObject.city}, {roomObject.street}
                    </div>
                    <div>
                        {roomObject.offersWifi}
                        {roomObject.offersWifi ? <div className="offers-wifi"> <i className="fa fa-wifi" aria-hidden="true"></i> Free Wifi </div> : <div className="no-wifi"><i className="fa fa-meh-o" aria-hidden="true"></i>No Wifi </div>}
                    </div>
                </div>
                <div className="column large-3  small-6 room-item-side">
                    <div className="room-item-rate">
                        <p>Excellent <b>{roomObject.rate}</b></p>
                    </div>
                    <div className="room-item-reviews">
                        {roomObject.reviewsCount} reviews
                    </div>
                    <div className='room-item-price'>
                        <div className="room-item-old-price">
                            {roomObject.oldPrice}

                        </div>
                        <div className="room-item-new-price">
                            <b>{roomObject.newPrice}</b> TL

                        </div>
                    </div>


                </div>
                <Modal ref="modal"   style={modalStyle}>
                    <div className="row">
                        <div className="circle">
                            <img src={require('../assets/images/logo.png')} alt=""/>

                        </div>
                        <form action="">
                            <div className="row">
                                <div className="column large-6">
                                    <label htmlFor="email" > Check in</label>
                                    <DatePicker
                                        selected={this.state.availableFrom}
                                        selectsStart
                                        startDate={this.state.availableFrom}
                                        endDate={this.state.availableTo}
                                        onChange={this.handleChangeAvailableFrom}

                                    />
                                </div>


                                <div className="column large-6">
                                    <label htmlFor="password">Check out</label>
                                    <DatePicker
                                        selected={this.state.availableTo}
                                        selectsEnd
                                        startDate={this.state.availableFrom}
                                        endDate={this.state.availableTo}
                                        onChange={this.handleChangeAvailableTo}
                                    />
                                </div>

                                <a className="btn btn-success" href="#" onClick={this.handleSubmit}>Book Now!</a>

                            </div>


                        </form>

                    </div>


                </Modal>
                <NotificationSystem ref="notificationSystem" />



            </div>


        )
    }
}
export default connect(
    (state) => {
        return state;
    }
)(RoomItem);