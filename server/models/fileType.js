/**
 * Created by mohammadmaleh on 26/09/2017.
 */
var mongoose = require('mongoose')

let FileType =  mongoose.model('FileType',{
    name : {
        type: String,
        required:true,
        minlength:4,
        unique:true
    },

    rule:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rule'
    },
    createdBy:{
        type: String,
        required:true
    },

    createdAt:{
        type:Number,
        required:true
    },
    father:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileType'

    },
    deleted:{
        type:Boolean,
        default:false
    }

})
module.exports = {FileType}