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
            showFilesList:false,
            fileType:null,
            fileExtensionsRulesString:'',
            maxSize:99
        }
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
    handleFormChange = (event) => {
        event.preventDefault()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            showDropZone:true,
            filesArray:[],

        });

        this.props.sharedData.fileTypeList.map(fileType =>{
            if ( fileType.rule && fileType._id === value){
                let {fileExtensions,maxSize} =fileType.rule;
                let fileExtensionsRulesString = this.state;
                if (fileExtensions.images)
                    fileExtensionsRulesString+= 'image/jpeg, image/png,image/jpg,image/gif,image/svg+xml '
                if (fileExtensions.word)
                    fileExtensionsRulesString+= 'application/msword , application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document '

                if (fileExtensions.excel)
                    fileExtensionsRulesString+= 'application/vnd.ms-excel , application/msexcel , application/x-msexcel ,application/x-ms-excel , application/xls , application/x-xls '
                if (fileExtensions.pdf)
                    fileExtensionsRulesString+= 'application/pdf '
                if (fileExtensions.mp3)
                    fileExtensionsRulesString+= ' audio/mpeg, audio/mp3 , audio/mp3'
                if (fileExtensions.mp4)
                    fileExtensionsRulesString+= 'video/mp4 '
                if (fileExtensions.fonts)
                    fileExtensionsRulesString+= 'image/jpeg, image/png,image/jpg '
                if (fileExtensions.zip)
                    fileExtensionsRulesString += 'application/x-rar-compressed, application/octet-stream , application/zip, application/octet-stream '

                this.setState({
                    fileExtensionsRulesString,
                    maxSize
                })
            }
        })
        {

        }
    }

    handleAddFileChange(acceptedFiles, rejectedFiles){
        let filesArray= this.state.filesArray

        acceptedFiles.map(file=>{
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
        let {filesArray} = this.state
        let {sharedData} = this.props
        return filesArray.map((file)=>{
            return <div className="" key={file.id}>
                        <div className="col-lg-6">
                            <FileObject file={file} sharedData={sharedData} handleRemoveFile={::this.handleRemoveFile} handleFilesChanges={::this.handleFilesChanges}/>

                        </div>
                    </div>
        })
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
                        this.props.closeAddFileModal()

                        this.props.sharedData.notification({message:'Your files has been added successfully',type:'success'})
                        console.log(res)
                    })
                    .catch((e)=>{

                        this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

                    })
            })
        }
    }


    render(){
        let{showDropZone,filesArray} = this.state

        return(

            <div>

                <Modal.Header closeButton>
                    <Modal.Title><h3>Add File</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-4 newco-form">
                            <label htmlFor="">Select A file type</label>
                            <select name="fileType"  className="newco-text-input margin-bottom-15" onChange={::this.handleFormChange}>
                                <option value="" selected> Any</option>
                                {this.props.sharedData.availableFileTypes.map(fileType =>
                                    <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                )};
                            </select>

                            {showDropZone ?

                                <Dropzone
                                    style={{display:showDropZone}}
                                    className="dropzone "
                                    onDrop={::this.handleAddFileChange}
                                    maxSize={this.state.maxSize*1000000}
                                    accept={this.state.fileExtensionsRulesString}
                                >
                                    <p>Drag and Drop <br/> or <br/> Click <br/> to upload</p>
                                </Dropzone> :''}
                        </div>
                        <div className="col-lg-8">
                            {filesArray.length>0 ?
                                <div className="file-objects-container row">
                                    {this.renderFile()}
                                </div>
                            :
                            ''
                            }

                        </div>

                    </div>





                </Modal.Body>
                <Modal.Footer>
                    <a className="newco-button light-green-background margin-right-10" onClick={()=>{this.props.closeAddFileModal()}}>Close</a>
                    <a className="newco-button light-red-background" onClick={::this.handleSubmitFiles}>Add</a>
                </Modal.Footer>

            </div>
        )
    }
}