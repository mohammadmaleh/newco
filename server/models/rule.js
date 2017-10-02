var mongoose = require('mongoose')


let Rule =  mongoose.model('Rule',{
    name : {
        type: String,
        required:true,
        minlength:4,
        trim:true
    },
    maxSize:{
        type: Number,
    },

    fileExtensions:{
        type:Object,
        default:{
            images:false,
            word:false,
            excel:false,
            pdf:false,
            mp3:false,
            mp4:false,
            fonts:false,
            zip:false,
        }

    },
    createdBy:{
        type: String,
        required:true
    },

    createdAt:{
        type:Number,
        required:true
    },



})
module.exports = {Rule}