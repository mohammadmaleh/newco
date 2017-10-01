var mongoose = require('mongoose')
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
    equipment:['','','','']


}

var Room =  mongoose.model('Room',{
    title : {
        type: String,
        required:true,
        minlength:4,
        trim:true
    },
    description: {
        type: String,
        minlength:4,
        trim:true
    },
    mainImage:  {
        data: Buffer,
        contentType: String,
        path:String
    },
    stars:{
        type: Number,
        default:0
    },
    oldPrice:{
        type:Number,
        required :true,

    },
    newPrice:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    availableFrom:{
        type:Number,
        required:true
    },
    availableTo:{
        type:Number,
        required:true
    },
    offersWifi:{
        type:Boolean,
        required:true
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }
})
module.exports= {Room}