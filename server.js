require('./server/config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const base64_arraybuffer = require('base64-arraybuffer')
var cors=require('cors');
var multer = require('multer');
let path = require('path')
const fs =  require('fs')
const uuid = require('uuid/v1');
let moment = require('moment')
const {ObjectID} = require('mongodb')
const {mongoose} = require('./server/db/mongoose');
const {User} = require('./server/models/user');
const {FileType} = require('./server/models/fileType');
const {File} = require('./server/models/file');
const {Rule} = require('./server/models/rule');
// const {Room} = require('./server/models/room');
const  port = process.env.PORT || 3000 ;
const  {authenticate} = require('./server/middleware/authenticate')

var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, uuid()+file.originalname );
    }
});

var upload = multer({storage: storage});
let app =  express();
app.use(bodyParser.json());
app.use(cors({origin:true,credentials: true,allowedHeaders:['Content-Type','multipart/form-data' , 'Authorization','x-auth'],exposedHeaders:['Content-Type','multipart/form-data' , 'Authorization','x-auth']}));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))
app.use(express.static('public'));
app.get('/', function(request, response) {
    response.sendFile(__dirname+'/public/index.html');
});
app.get('/home-page', function(request, response) {
    response.sendFile(__dirname+'/public/index.html');
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })
// app.post('/rooms',upload.any(),(req,res)=>{
//     let body =  _.pick(req.body, ['title','description','stars','reviewCount',
//         'rate','oldPrice','newPrice','street','capacity','favorite','size','_creator','equipment','availableFrom','availableTo','city','offersWifi']);
//     var room = new Room(body);
//     console.log('post')
//     console.log(body)
//
//     room.mainImage.data = fs.readFileSync(req.files[0].path)
//     room.mainImage.contentType = 'image/png';
//     room.mainImage.path = req.files[0].path;
//
//     room.save().then((doc)=>{
//             res.send(doc)
//         },(e)=>{
//             res.status(400).send(e)
//         });;
//
//     // // let body =  _.pick(req.body, ['title','description','mainImage','stars','reviewCount',
//     // //     'rate','oldPrice','newPrice','street','capacity','favorite','size','_creator','equipment','availableFrom','availableTo','city']);
//     // console.log(req.files)
//     // console.log(req.body)
//     // // let room = new Room(body);
//     // // room.save().then((doc)=>{
//     // //     res.send(doc)
//     // // },(e)=>{
//     // //     res.status(400).send(e)
//     // // });
// })

// app.post('/searchRooms',(req,res)=>{
//     let body=_.pick(req.body, ['city','availableTo','availableFrom','capacity']);
//     console.log('search')
//     if (body.capacity === 'Any')
//         body.capacity = 0
//     console.log(body)
//     if ( body.city.length > 0){
//         Room.find()
//             .where('city').equals(body.city)
//             .where('availableFrom').lte(body.availableFrom)
//             .where('availableTo').gte(body.availableTo)
//             .where('capacity').gte(body.capacity)
//             .then((rooms)=>{
//                 // rooms.mainImage = base64_arraybuffer.encode(rooms[0].mainImage.data))
//
//                 res.send({
//                     rooms,
//
//                 })
//             },(e)=>{
//                 res.status(400).send(e)
//
//             })
//
//     }
//     else{
//         Room.find()
//             .where('availableFrom').lte(body.availableFrom)
//             .where('availableTo').gte(body.availableTo)
//             .where('capacity').gte(body.capacity)
//             .then((rooms)=>{
//                 // rooms.mainImage = base64_arraybuffer.encode(rooms[0].mainImage.data))
//
//                 res.send({
//                     rooms,
//
//                 })
//             },(e)=>{
//                 res.status(400).send(e)
//
//             })
//
//     }
// });
// app.get('/rooms/:id',authenticate,(req,res)=>{
//     let id = req.params.id;
//     if (!ObjectID.isValid(id)){
//          return res.status(404).send();
//     }
//     Room.findOne({
//         _id:id,
//         _creator:req.user._id
//     })
//         .then((room)=>{
//         if(!room){
//              return res.status(404).send()
//         }
//         res.send( {room})
//         })
//         .catch((e)=>{
//             res.status(400).send(e)
//         })
// })
// app.delete('/rooms/:id',authenticate,(req,res)=>{
//     let id = req.params.id;
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     }
//     Room.findOneAndRemove({
//         _id:id,
//         _creator:req.user._creator
//     })
//         .then((room)=>{
//             if(!room){
//                 return res.status(404).send()
//             }
//             res.send( {room})
//         })
//         .catch((e)=>{
//             res.status(400).send(e)
//         })
// });
// app.patch('/rooms/:id',authenticate ,(req,res)=>{
//     let id = req.params.id;
//     let body =  _.pick(req.body, ['text','completed']);
//     if (!ObjectID.isValid(id)){
//         return res.status(404).send();
//     }
//     if (body.completed && _.isBoolean(body.completed)   ){
//         body.completedAt = new Date().getTime()
//     }
//     else{
//         body.completed= false
//         body.completedAt = null
//     }
//
//
//     Room.findOneAndUpdate({_id:id,_creator:req.user._creator},{$set:body},{new:true})
//         .then((room)=>{
//             if(!room){
//                 return res.status(404).send()
//             }
//             res.send( {room})
//         })
//         .catch((e)=>{
//             res.status(400).send(e)
//         })
// });

app.post('/api/users/signup',(req,res)=>{
    let body =  _.pick(req.body, ['password','lastName','firstName','username']);
    console.log(req.body)
    let user = new User(body);
    user.save()
        .then((user)=>{
        return user.generateAuthToken()
        })
        .then((token)=>{
            res.header('x-auth', token ).send(user)
        })
        .catch((e)=>{
        res.status(400).send(e)

    });
});

app.get('/api/users/me',authenticate,(req,res)=>{
    res.send(req.user)
});
app.listen( port , ()=>{
    console.log(`server is up on ${port}`);
});

app.post('/api/users/login',(req,res)=>{
    console.log('here')
    let body =  _.pick(req.body, ['username','password']);
    console.log(body)
    User.findByCredentials(body.username,body.password).then((user)=> {
        return user.generateAuthToken()
            .then((token) => {

                res.header('x-auth', token).send(user)
            }).catch((e) => {
                console.log(e)
                res.status(400).send();
            })
    })
        .catch((e)=>{
            console.log(e)
            res.status(500).send(e);

        })
})
app.delete('/api/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send()
    }).catch(()=>{
        res.status(400).send()
    })

})

app.post('/api/fileType',(req,res)=>{
    let body = _.pick(req.body , ['name','rule','createdBy','createdAt','father'])
    var fileType = new FileType(body)
    fileType.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)
    })

})
app.get('/api/fileType',(req,res)=>{
    FileType.find({})
        .populate({
            path: 'rule',
            model: 'Rule',

         })
        .then((fileType)=>{
            if(!fileType){
                return res.status(404).send()
            }
            res.send( {fileType})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })

});

app.get('/api/availableFileType',(req,res)=>{
    FileType.find({
        deleted:false
    })
        .populate({
            path: 'rule',
            model: 'Rule',

         })
        .then((fileType)=>{
            if(!fileType){
                return res.status(404).send()
            }
            res.send( {fileType})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })

});
app.delete('/api/fileType/:id',(req,res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    FileType.findOneAndUpdate({_id:id,},{deleted:true},{new:true})
        .then((fileType)=>{
            if(!fileType){
                return res.status(404).send()
            }
            res.send( {fileType})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});
app.patch('/api/fileType/:id',(req,res)=>{
    let id = req.params.id;
    let body =  _.pick(req.body, ['name','createdBy','createdAt','father','rule']);
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    console.log(body)
    FileType.findOneAndUpdate({_id:id},{$set:body},{new:true})
        .then((filetype)=>{
            if(!filetype){
                return res.status(404).send()
            }
            res.send( {filetype})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});





// app.post('/api/file',(req,res)=>{
//     let body =  _.pick(req.body, ['title','description','uploadedBy','uploadedAt','tags','description','fileType']);
//     let file = new File(body);
//     file.save().then((doc)=>{
//             res.send('success')
//         },(e)=>{
//             res.status(400).send(e)
//         });;
//
//
// })
// app.post('/api/file',(req,res)=>{
//     let body =  _.pick(req.body, ['title','description','uploadedBy','uploadedAt','tags','description','fileType']);
//     if (!ObjectID.isValid(body.fileType)){
//         return res.status(404).send();
//     }
//     let file = new File(body);
//
//     file.save().then((doc)=>{
//         res.send(doc)
//     },(e)=>{
//         res.status(400).send(e)
//     });;
//
//
// })
app.get('/api/file',(req,res)=>{
    File.find({})
        .populate({
            path: 'fileType',
            model: 'FileType',
            populate: {
                path: 'rule',
                model: 'Rule'
            }
        })
        .then((file)=>{
            if(!file){
                return res.status(404).send()
            }
            res.send( {file})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })



})
app.post('/api/searchFiles',(req,res)=>{
    let body = _.pick(req.body,['title','startDate','endDate','description','tags','uploadedBy','fileType'])

    body.startDate = moment.unix(body.startDate).add(3, 'hours').startOf('day').unix();
    body.endDate = moment.unix(body.endDate).add(3, 'hours').endOf('day').unix();

    let searchQuery = {
        uploadedAt: { $gt: body.startDate,$lt: body.endDate },
    }
    if(body.title && body.title.length >0 ){
        searchQuery.title = { $regex: '.*' + body.title + '.*' }
    }
    if(body.description && body.description.length >0 ){
        searchQuery.description = { $regex: '.*' + body.description + '.*' }
    }
    if(body.tags && body.tags.length >0 ){
        searchQuery.tags = {$in:body.tags}
    }
    if(body.uploadedBy && body.uploadedBy.length >0 ){
        searchQuery.uploadedBy = body.uploadedBy
    }
    if(body.fileType && body.fileType.length >0 ){
        searchQuery.fileType = body.fileType
    }
    console.log(searchQuery)

    File.find(searchQuery)
        .populate({
            path: 'fileType',
            model: 'FileType',
            populate: {
                path: 'rule',
                model: 'Rule'
            }
        })

        .then((file)=>{
            if(!file){
                return res.status(404).send()
            }
            res.send( {file})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
})
app.delete('/api/file/:id',(req,res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    File.findOneAndRemove({
        _id:id,
    })
        .then((file)=>{
            if(!file){
                return res.status(404).send()
            }
            res.send( {file})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});
app.patch('/api/file/:id',(req,res)=>{

    let id = req.params.id;
    let body =  _.pick(req.body, ['title','description','tags','fileType','newFile']);
    if (body.fileType === 'null')
        body.fileType= null;
    console.log(body)
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }



    File.findOneAndUpdate({_id:id},{$set:body},{new:true})
        .then((file)=>{
            if(!file){

                return res.status(404).send()
            }
            res.send( file)
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});
app.get('/api/file/:id',(req,res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)){
         return res.status(404).send();
    }
    File.findOne({
        _id:id,
    })
        .then((file)=>{
        if(!file){
             return res.status(404).send()
        }
        res.send( {file})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
})
// app.post('/searchRooms',(req,res)=>{
//     let body=_.pick(req.body, ['city','availableTo','availableFrom','capacity']);
//     console.log('search')
//     if (body.capacity === 'Any')
//         body.capacity = 0
//     console.log(body)
//     if ( body.city.length > 0){
//         Room.find()
//             .where('city').equals(body.city)
//             .where('availableFrom').lte(body.availableFrom)
//             .where('availableTo').gte(body.availableTo)
//             .where('capacity').gte(body.capacity)
//             .then((rooms)=>{
//                 // rooms.mainImage = base64_arraybuffer.encode(rooms[0].mainImage.data))
//
//                 res.send({
//                     rooms,
//
//                 })
//             },(e)=>{
//                 res.status(400).send(e)
//
//             })
//
//     }
//     else{
//         Room.find()
//             .where('availableFrom').lte(body.availableFrom)
//             .where('availableTo').gte(body.availableTo)
//             .where('capacity').gte(body.capacity)
//             .then((rooms)=>{
//                 // rooms.mainImage = base64_arraybuffer.encode(rooms[0].mainImage.data))
//
//                 res.send({
//                     rooms,
//
//                 })
//             },(e)=>{
//                 res.status(400).send(e)
//
//             })
//
//     }
// });
// app.post('/rooms',upload.any(),(req,res)=>{
//     let body =  _.pick(req.body, ['title','description','stars','reviewCount',
//         'rate','oldPrice','newPrice','street','capacity','favorite','size','_creator','equipment','availableFrom','availableTo','city','offersWifi']);
//     var room = new Room(body);
//     console.log('post')
//     console.log(body)
//
//     room.mainImage.data = fs.readFileSync(req.files[0].path)
//     room.mainImage.contentType = 'image/png';
//     room.mainImage.path = req.files[0].path;
//
//     room.save().then((doc)=>{
//             res.send(doc)
//         },(e)=>{
//             res.status(400).send(e)
//         });;
//
//     // // let body =  _.pick(req.body, ['title','description','mainImage','stars','reviewCount',
//     // //     'rate','oldPrice','newPrice','street','capacity','favorite','size','_creator','equipment','availableFrom','availableTo','city']);
//     // console.log(req.files)
//     // console.log(req.body)
//     // // let room = new Room(body);
//     // // room.save().then((doc)=>{
//     // //     res.send(doc)
//     // // },(e)=>{
//     // //     res.status(400).send(e)
//     // // });
// })



app.post('/api/file/:id',upload.single('newFile'),(req,res)=>{

    let id = req.params.id;
    let body =  _.pick(req.body, ['title','description','tags','fileType',]);
    if (body.fileType === 'null')
        body.fileType= null;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if (req.file && req.file.path){

        File.find({_id:id})
            .then(file =>{
                console.log(file)
                console.log(0)
                console.log(file)
                fs.unlink(__dirname + '/'  + file[0].filePath ,(err)=>{
                    if(err){
                        console.log(err)
                        res.status(400).send(err)
                    }
                    else {
                        console.log(1)
                        body.filePath = req.file.path
                        body.type = req.body.type
                        console.log(req.body.type)
                        File.findOneAndUpdate({_id:id},{$set:body},{new:true})
                            .then((file)=>{
                                console.log(2)
                                if(!file){

                                    return res.status(404).send()
                                }
                                res.send( file)
                            })
                            .catch((e)=>{
                                res.status(400).send(e)
                            })
                    }
                })


            })
            .catch(e=>{
                res.status(400).send(e)

            })
    }
    else {
        console.log('with image')
        File.findOneAndUpdate({_id:id},{$set:body},{new:true})
            .then((file)=>{
                if(!file){

                    return res.status(404).send()
                }
                res.send( file)
            })
            .catch((e)=>{
                res.status(400).send(e)
            })

    }

})
app.post('/api/file', upload.single('file'),function (req, res, next) {
    console.log(req.file) // form files
    console.log(req.body) // form files
    let body =  _.pick(req.body, ['title','description','uploadedBy','uploadedAt','tags','description','fileType','type']);
    body.filePath = req.file.path;
    if (body.fileType === 'null')
        body.fileType= null;
    let file = new File(body);
    file.save().then((doc)=>{
        res.send('success')
    },(e)=>{
        res.status(400).send(e)
    });;



});
app.get('/api/download/:id', function(req, res){
    let id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    File.find({_id:id})
        .then(file=>{



            var dir=__dirname + '/'  + file[0].filePath; // give path
            res.download(dir, file.title,function (err) {
                if(err){
                    res.status(500).send(err)
                }

            });


        })
        .catch(e =>{
            return res.status(404).send(e);

        })

});











app.post('/api/rule',(req,res)=>{
    let body = _.pick(req.body , ['name','maxSize','fileExtensions'])
    var rule = new Rule(body)
    rule.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)
    })

})
app.get('/api/rule',(req,res)=>{
    Rule.find({})
        .then((rule)=>{
            if(!rule){
                return res.status(404).send()
            }
            res.send( {rule})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })

});
app.delete('/api/rule/:id',(req,res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Rule.findOneAndRemove({
        _id:id,
    })
        .then((rule)=>{
            if(!rule){
                return res.status(404).send()
            }
            res.send( {rule})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});
app.patch('/api/rule/:id',(req,res)=>{
    let id = req.params.id;
    let body =  _.pick(req.body, ['name','maxSize','fileExtensions']);
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }



    Rule.findOneAndUpdate({_id:id},{$set:body},{new:true})
        .then((rule)=>{
            if(!rule){
                return res.status(404).send()
            }
            res.send( {rule})
        })
        .catch((e)=>{
            res.status(400).send(e)
        })
});



module.exports = {app};