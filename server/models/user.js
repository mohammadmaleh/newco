const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
let UserSchema =  new mongoose.Schema({

        password:{
            type: String,
            required:true,
            minlength:6
        },
        username:{
            type: String,
            required:true,
            minlength:3,
            validate:{ // custom validation
                validator:(value)=>{ // return true if valid return false if not
                    return validator.isEmail(value)
                },
                message:'{VALUE} is not a valid email'


            }

        },

        tokens:[{
            access:{
                type:String,
                required:true
            },
            token:{
                type:String,
                required:true
            }
        }]
    })
UserSchema.methods.toJSON = function(){
 let user = this;
 let userObject = this.toObject()
    return _.pick(userObject,['_id','email','username'])
}
UserSchema.methods.generateAuthToken =function () {
    let user = this ;
    let access = 'auth';
    let token = jwt.sign({_id : user._id.toHexString(),agenerateAuthTokenccess:access},process.env.JTWSecret).toString();/* secert code inside config.json*/
    user.tokens.push({access:access,token:token})
    return user.save().then(()=>{
        return token
    })
}

UserSchema.statics.findByToken= function (token) {
    let User = this;
    let decoded;
    try{
       decoded= jwt.verify(token,process.env.JTWSecret)/* secert code inside config.json*/
    } catch (e){
        return new Promise.reject()

    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access':'auth',

    })
};
UserSchema.pre('save',function (next) {
    let user = this ;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(user.password,salt,(err, hash)=>{
                user.password = hash;

                next();
            })
        });
    }
    else{
        next();
    }

})

UserSchema.statics.findByCredentials = function (username,password) {
    var User = this ;
    return User.findOne({username}).then((user)=>{

        if(!user){
            return Promise.reject();

        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{

                if (res){
                    resolve(user)
                }
                else{
                    reject();
                }
            })
        })
    })
}
UserSchema.methods.removeToken  =function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens:{
                 token : token
            }
        }
    })
}

var User = mongoose.model('User', UserSchema )
module.exports = {User}