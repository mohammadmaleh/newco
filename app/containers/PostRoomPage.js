import React,{Component} from 'react'
import {saveRoom} from 'roomsAPI'
import {connect} from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import InputRange from 'react-input-range';
import Dropzone from 'react-dropzone'
import NotificationSystem from 'react-notification-system';
import validator from 'validator'
let notificationOpts = {
    title: '',
    message: '',


};
class PostRoomPage extends Component{


    constructor(props){
        super(props)
        this.postARoom= this.postARoom.bind(this)
        this.handleImageChange= this.handleImageChange.bind(this)
        this.handleFormChange= this.handleFormChange.bind(this)
        this.onStarClick= this.onStarClick.bind(this)
        this.handleChangeStartDate= this.handleChangeStartDate.bind(this)
        this.handleChangeEndDate= this.handleChangeEndDate.bind(this)
        this.handleChangeDiscount= this.handleChangeDiscount.bind(this)
        this.handlePriceChange= this.handlePriceChange.bind(this)
        this.deleteImage= this.deleteImage.bind(this)
        this.addNotification= this.addNotification.bind(this)
        this.validation= this.validation.bind(this)
        this.postRoomObject = new FormData();
        this.notificationSystem=null;
        this.state = {
            title:'',
            description:'',
            stars:1,
            newPrice:0,
            oldPrice:0,
            capacity:1,
            size:100,
            availableFrom:moment().startOf('day'),
            availableTo:moment().startOf('day').add(1,'Day'),
            street:'',
            city:'',
            offersWifi:true,
            discount:0,
            mainImage:[],
            validationStyle:{
                title:'',
                description:'',
                size:'',
                capacity:'',
                mainImage:'',
                oldPrice:'',
                city:''
            }



        }

    }
    addNotification(notificationOpts) {
        this.notificationSystem.addNotification({
            message: notificationOpts.message,
            level: notificationOpts.title.toLowerCase(),
            title:notificationOpts.title,
            position: 'tr',
            autoDismiss: 2,


        });
    }
    handleImageChange(files){

        this.setState({
            mainImage: files
        });
            let reader = new FileReader();
            let file = files[0];
            this.postRoomObject.append('mainImage',file)
                reader.onloadend = () => {
                    this.postRoomObject.mainImage = file
            }

            reader.readAsDataURL(file)

    }
    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }
    handlePriceChange(e){
        let oldPrice =  e.target.value

        this.setState({
            oldPrice,
            newPrice:oldPrice,
            discount:0
        });
    }
    validation(){
        let {capacity,size,title,city,mainImage,oldPrice,description}= this.state;
        let validTitle = validator.isLength(title,{min:4,max:undefined})
        let validCity = validator.isLength(city,{min:1,max:undefined})
        let validDescription= validator.isLength(description,{min:4,max:undefined})
        let validSize =  size !== ''
        let validCapacity =  capacity !== ''
        let validOldPrice =  oldPrice !== ''
        let validMainImage = mainImage.length > 0
        notificationOpts.title = 'Error';
        if(!validTitle){
            notificationOpts.message = 'Title is too Short at least 4 characters are required '
            this.addNotification(notificationOpts)
        }
        if(!validDescription){
            notificationOpts.message = 'Description is too Short at least 4 characters are required '
            this.addNotification(notificationOpts)
        }
        if(!validSize){
            notificationOpts.message = 'Size is required '
            this.addNotification(notificationOpts)
        }
        if(!validCapacity){
            notificationOpts.message = 'Capacity is required '
            this.addNotification(notificationOpts)
        }
        if(!validOldPrice){
            notificationOpts.message = 'Price is required '
            this.addNotification(notificationOpts)
        }
        if(!validCity){
            notificationOpts.message = 'Price is required '
            this.addNotification(notificationOpts)
        }
        if(!validMainImage){
            notificationOpts.message = 'Main Image is required '
            this.addNotification(notificationOpts)
        }

        this.setState({
            validationStyle:{
                title:validTitle ? '' : 'red',
                description:validDescription ? '' : 'red',
                size:validSize ? '' : 'red',
                capacity:validCapacity ? '' : 'red',
                mainImage:true ? '' : 'red',
                oldPrice:validOldPrice ? '' : 'red',
                city:validCity ? '' : 'red'
            }

        })
        return validMainImage && validCity && validOldPrice && validCapacity && validSize
    }


    postARoom(e){
        e.preventDefault()
        if (this.validation())
        {
            let {title,description,stars,oldPrice,newPrice,city,offersWifi,street,size,capacity,availableFrom,availableTo} = this.state
            this.postRoomObject.append('title',title)
            this.postRoomObject.append('description',description)
            this.postRoomObject.append('stars',stars)
            this.postRoomObject.append('oldPrice',oldPrice)
            this.postRoomObject.append('newPrice',newPrice)
            this.postRoomObject.append('city',city)
            this.postRoomObject.append('offersWifi',offersWifi)
            this.postRoomObject.append('street',street)
            this.postRoomObject.append('size',size)
            this.postRoomObject.append('capacity',capacity)
            this.postRoomObject.append('availableFrom',availableFrom.unix())
            this.postRoomObject.append('availableTo',availableTo.unix())
            this.postRoomObject.append('_creator',this.props.loginUser._id)


            saveRoom(this.postRoomObject).then(()=>{
                notificationOpts.title = 'Success';
                notificationOpts.message = 'Your room posted successfully '
                this.addNotification(notificationOpts)
                setTimeout(()=>{
                    this.props.history.push("/")

                },1000)

            }).catch((error)=>{
                notificationOpts.title = 'Error';
                notificationOpts.message = 'Opps!  something is wrong with our service please check later '
                this.addNotification(notificationOpts)
            });
        }


        // this.props.history.push('/');
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({stars : nextValue});

    }
    handleChangeStartDate(date){
        this.setState({
            availableFrom: date
        });
    }
    handleChangeEndDate(date){
            this.setState({
                availableTo: date
            });
        }
    handleChangeDiscount(value){
        let{oldPrice} = this.state
        let newPrice =  Math.round(parseFloat(oldPrice) - ((parseFloat(oldPrice)*parseFloat(value))/100))
        this.setState({
            newPrice,
            discount:value
        })
    }
    deleteImage(){
        this.setState({mainImage:[]})
    }
    componentDidMount() {
      this.notificationSystem = this.refs.notificationSystem;
    }


    render(){

        let dropBox = null ;
        let {mainImage} = this.state
        if (mainImage.length > 0){
            dropBox =  <div className="drop-image-container">
                <i className="fa fa-times" aria-hidden="true" onClick={this.deleteImage}/>
                <img src={mainImage[0].preview}/>

            </div>
        }
        else {
            dropBox =  <Dropzone
                className="dropzone"
                maxSize={500000}
                onDrop={this.handleImageChange}
                accept="image/jpeg, image/png,image/jpg">
                <p>Drag and Drop <br/> or <br/> Click <br/> to upload :)</p>
            </Dropzone>
        }
        let {title,validationStyle} = this.state
        return <div className="post-room-page">
            <form   id="post-room-form"  >
                <div className="row">
                    <div className="column large-5">
                        <label htmlFor="title" >Title </label>
                        <input  type="text" name="title" value={title} onChange={this.handleFormChange}
                                style={{borderColor:validationStyle.title}}/>
                    </div>
                    <div className="column large-5 float-left">
                        <label htmlFor="description">Description </label>
                        <input  type="text" name="description" onChange={this.handleFormChange}
                                style={{borderColor:validationStyle.description}}/>
                    </div>


                </div>
                <div className="row">
                    <div className="column large-3" >
                        <label htmlFor="mainImage">main image </label>
                        {dropBox}
                    </div>
                    <div className="column large-9" >
                        <div className="row">
                            <div className="column large-3">
                                <label htmlFor="city">City </label>
                                <input  type="text" name="city" ref='city' onChange={this.handleFormChange}
                                        style={{borderColor:validationStyle.city}}/>
                            </div>
                            <div className="column large-6 float-left">
                                <label htmlFor="street">Street </label>
                                <input  type="text" name="street" ref='street'onChange={this.handleFormChange}/>
                            </div>
                        </div>
                        <div className="row">

                            <div className="column large-3">
                                <label htmlFor="capacity">Capacity </label>
                                <input  type="number" name="capacity" ref='capacity'    value={this.state.capacity} onChange={this.handleFormChange}
                                        style={{borderColor:validationStyle.capacity}}/>
                            </div>
                            <div className="column large-3 float-left">
                                <label htmlFor="size">size</label>
                                <input  type="number" name="size" ref='size' value={this.state.size} onChange={this.handleFormChange}
                                        style={{borderColor:validationStyle.size}}/>
                            </div>
                            <div className="column large-3 post-star float-left" >
                                <label htmlFor="stars">Stars </label>
                                <StarRatingComponent
                                    name={'rateFilter'}
                                    starCount={5}
                                    value={this.state.stars}
                                    onStarClick={this.onStarClick}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="column large-3">
                                <label htmlFor="availableFrom">available From </label>
                                <DatePicker
                                    selected={this.state.availableFrom}
                                    selectsStart
                                    startDate={this.state.availableFrom}
                                    endDate={this.state.availableTo}
                                    onChange={this.handleChangeStartDate}

                                />
                            </div>
                            <div className="column large-3 ">
                                <label htmlFor="availableTo">available To </label>
                                <DatePicker
                                    selected={this.state.availableTo}
                                    selectsEnd
                                    startDate={this.state.availableFrom}
                                    endDate={this.state.availableTo}
                                    onChange={this.handleChangeEndDate}
                                />
                            </div>
                            <div className="column large-3 float-left">
                                <label htmlFor="offersWifi">offersWifi </label>
                                <input  type="checkbox" checked={this.state.offersWifi} name="offersWifi" onChange={this.handleFormChange} />
                            </div>

                        </div>
                        <div className="row">
                            <div className="column large-3">
                                <label htmlFor="oldPrice">Original Price </label>
                                <input  type="number"  value={this.state.oldPrice} name="oldPrice" ref='oldPrice' onChange={this.handlePriceChange}
                                        style={{borderColor:validationStyle.oldPrice}}/>
                            </div>
                            <div className="column large-3">

                                <label htmlFor="newPrice">discount</label>
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    formatLabel={value => `${value} %`}
                                    value={this.state.discount}
                                    onChange={this.handleChangeDiscount} />


                            </div>
                            <div className="column large-3 float-left">
                                <label htmlFor="newPrice">Final Price</label>
                                <p>{this.state.newPrice} TL</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <a className="btn btn-full float-left" href="#" onClick={this.postARoom}>Post</a>

                    </div>

                </div>

            </form>
            <NotificationSystem ref="notificationSystem" />
        </div>
    }

}
export default connect(
    (state) => {
        return state;
    }
)(PostRoomPage);