var mongoose = require('mongoose')


let File =  mongoose.model('File',{
    title : {
        type: String,
        required:true,
        minlength:4,
        trim:true
    },

    data:  {
        data: Buffer,
        contentType: String,
        path:String,
    },
    uploadedBy:{
        type: String,
        required:true
    },

    uploadedAt:{
        type:Number,
        required:true
    },
    tags:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        default:''
    },
    fileType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileType'
    },
    type:{
        type:String,
        default:''
    },
    filePath:{

        type: String,
        required:true,
        minlength:3,

    }


})
module.exports = {File}