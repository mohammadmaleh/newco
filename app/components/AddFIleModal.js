/**
 * Created by mohammadmaleh on 30/09/2017.
 */
import React,{Component} from'react'
import {Modal}from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import {postFiles} from 'filesAPI'
import moment from 'moment'
import {getUserInfo} from 'storage'
const uuid = require('uuid/v1');
import FileObject from 'FileObject'
import {getAllFileTypes} from 'fileTypeAPI'

export default class AddFIleModal extends Component{
    constructor(){
        super();
        this.state = {
            filesArray:[],
            fileTypeList:[]
        }
    }
    componentWillMount(){
        getAllFileTypes()
            .then((res)=>{

                this.setState({
                    fileTypeList:res.data.fileType
                })
            })
            .catch((e)=>{

            })
    }

    handleFilesChanges = (name,value,id) => {

        let {filesArray} = this.state

            filesArray.map(file=>{
                if(file.id === id) {
                    file[name] = value;
                }
            })



        this.setState({
            filesArray
        });
    }
    handleAddFileChange(files){
        console.log(files[0])
        let filesArray= this.state.filesArray

        files.map(file=>{
            filesArray.push({
                id:uuid(),
                title:file.name,
                description:'',
                tags:[],
                fileType:'',
                type:file.type,
                file,
            })
        })
        this.setState({
                filesArray
        })
        // let stateFiles= this.state.files
        // files.map(file=>{
        //     stateFiles.push(file)
        // })
        // this.setState({
        //         files:stateFiles
        // })

    }
    renderFile(){
        let {filesArray,fileTypeList} = this.state
        if(filesArray.length>0){
            return filesArray.map((file)=>{
                return <div className="list-group" key={file.id}>
                        <FileObject file={file} fileTypeList={fileTypeList} handleRemoveFile={::this.handleRemoveFile} handleFilesChanges={::this.handleFilesChanges}/>
                </div>
            })
        }
    }
    handleRemoveFile(id){
       let {filesArray} = this.state;
        filesArray= filesArray.filter(file=>{
           return  file.id !== id
       })
        this.setState({filesArray})
    }
    handleSubmitFiles(){
        let{filesArray} = this.state;
        let validForm = true
        filesArray.map(file=>{
            if(file.title < 4)
                validForm= false
            if (file.fileType === '')
                file.fileType = null;
        })
        if(validForm){
            let uploadObject;

            filesArray.map(file =>{
                uploadObject = new FormData()
                uploadObject.append('title',file.title)
                uploadObject.append('fileType',file.fileType)
                uploadObject.append('tags',file.tags)
                uploadObject.append('uploadedAt',moment().unix())
                uploadObject.append('uploadedBy',getUserInfo().username)
                uploadObject.append('file',file.file)
                uploadObject.append('type',file.type)
                postFiles(uploadObject)
                    .then((res)=>{
                        console.log(res)
                    })
                    .catch((e)=>{

                    })
            })
        }
        // if (title.length > 0 && description.length > 0){
        //     if (fileType === '')
        //         fileType = null;
        //     let uploadObject;
        //     files.map(file =>{
        //         uploadObject = new FormData()
        //         uploadObject.append('title',title)
        //         uploadObject.append('fileType',fileType)
        //         uploadObject.append('tags',tags)
        //         uploadObject.append('uploadedAt',moment().unix())
        //         uploadObject.append('uploadedBy',getUserInfo().username)
        //         uploadObject.append('file',file)
        //         postFiles(uploadObject)
        //             .then((res)=>{
        //                 console.log(res)
        //             })
        //             .catch((e)=>{
        //
        //             })
        //     })
        //
        //
        //
        //
        //
        //
        // }

    }


    render(){
        return(
            <div>

                <Modal.Header closeButton>
                    <Modal.Title>add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<div className="form-control">*/}
                        {/*<lable >Title</lable>*/}
                        {/*<input type="text"  name="title" value={this.state.title} onChange={::this.handleAddNameFormChange}/>*/}
                    {/*</div>*/}
                    {/*<div className="form-control">*/}
                        {/*<lable >description</lable>*/}
                        {/*<textarea   name="description" value={this.state.description} onChange={::this.handleAddNameFormChange}/>*/}
                    {/*</div>*/}
                    {/*<select name="fileType" onChange={::this.handleAddNameFormChange}>*/}
                        {/*<option value="" selected> Any</option>*/}
                        {/*{this.props.fileTypeList.map(fileType =>*/}
                            {/*<option key={fileType._id} value={fileType._id}>{fileType.name}</option>*/}
                        {/*)};*/}
                    {/*</select>*/}

                    <Dropzone
                        className="dropzone"
                        onDrop={::this.handleAddFileChange}
                        >
                        <p>Drag and Drop <br/> or <br/> Click <br/> to upload :)</p>
                    </Dropzone>
                    {/*<Dropzone*/}
                        {/*className="dropzone"*/}
                        {/*onDrop={::this.handleAddFileChange}*/}
                        {/*accept="image/jpeg, image/png,image/jpg">*/}
                        {/*<p>Drag and Drop <br/> or <br/> Click <br/> to upload :)</p>*/}
                    {/*</Dropzone>*/}
                    {this.renderFile()}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={()=>{this.props.closeAddFileModal()}}>Close</button>
                    <button className="btn btn-success" onClick={::this.handleSubmitFiles}>Add</button>
                </Modal.Footer>

            </div>
        )
    }
}