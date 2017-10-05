/**
 * Created by mohammadmaleh on 30/09/2017.
 */
import React,{Component} from 'react'
import{Modal} from 'react-bootstrap'
import moment from 'moment'
import Dropzone from 'react-dropzone'
import {patchFiles} from 'filesAPI'
import {getUserInfo} from 'storage'
import TagsInput from 'react-tagsinput'


export default class EditFileModal  extends Component{
    constructor(){
        super();

    }
    componentWillMount(){
        this.props.editForm.image = '';
        this.props.editForm.newFile = null;

        this.setState(this.props.editForm,()=>{
            this.updateUploadRules()

        })
    }

    handleEditFormChanges(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'fileType'){
            this.setState({
                newFile:null,
                [name]: value
            },()=>{
                this.updateUploadRules()
            })
        }
        else{
            this.setState({
                [name]: value

            });
        }


    }
    handleSubmitEditFile(){
        let{title,fileType,description,tags,_id,file,newFile,type} = this.state;
        if (title.length > 0 ){

            if (!fileType || fileType === '')
                fileType = null;
            else if(fileType._id)
                fileType = fileType._id


            let uploadObject = new FormData();
            uploadObject.append('title',title);
            uploadObject.append('fileType',fileType);
            uploadObject.append('tags',tags);
            uploadObject.append('uploadedAt',moment().unix());
            uploadObject.append('uploadedBy',getUserInfo().username);
            uploadObject.append('type',type);
            uploadObject.append('description',description);

            if (newFile)
                uploadObject.append('type',newFile.type);

            patchFiles(_id,uploadObject)
                .then((res)=>{
                    this.props.sharedData.notification({message:'Edited successfully',type:'success'})
                    this.props.closeEditModal()

                })
                .catch((e)=>{
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})
                })
        }
        else {
            this.props.sharedData.notification({message:'title should be more than 4 characters',type:'error'})
        }
    }
    updateUploadRules(){
        let fileExtensionsRulesString = '';
        let maxSize = 999999
        this.props.sharedData.fileTypeList.map(fileType =>{

            if ( fileType.rule && this.state.fileType && (fileType._id === this.state.fileType || fileType._id === this.state.fileType._id)){
                let {fileExtensions} =fileType.rule;
                if (fileExtensions.images)
                    fileExtensionsRulesString += 'image/jpeg, image/png,image/jpg ,'
                if (fileExtensions.word)
                    fileExtensionsRulesString += 'application/msword , application/msword , application/vnd.openxmlformats-officedocument.wordprocessingml.document ,'
                if (fileExtensions.excel)
                    fileExtensionsRulesString += 'application/vnd.ms-excel , application/msexcel , application/x-msexcel ,application/x-ms-excel , application/xls , application/x-xls ,'
                if (fileExtensions.pdf)
                    fileExtensionsRulesString += 'application/pdf ,'
                if (fileExtensions.mp3)
                    fileExtensionsRulesString += ' audio/mpeg, audio/mp3 , audio/mp3 ,'
                if (fileExtensions.mp4)
                    fileExtensionsRulesString += 'video/mp4  ,'
                if (fileExtensions.fonts)
                    fileExtensionsRulesString += 'image/jpeg, image/png,image/jpg ,'
                if (fileExtensions.zip)
                    fileExtensionsRulesString += 'application/x-rar-compressed, application/octet-stream , application/zip, application/octet-stream ,'

                maxSize = fileType.rule.maxSize


            }

        })
        this.setState({
            fileExtensionsRulesString,
            maxSize
        })
    }
    renderImage(){
        let file =this.state;
        let extType = file.type
        if (file.newFile)
            return <img src={file.newFile.preview} alt=""/>;
        else {
            if (extType.includes("image")){
                return <img src={file.image} alt=""/>
            }
            else if(extType.includes("msword") || extType.includes("wordprocessingml")  ||extType.includes("ms-word")){
                return  <img src={require('../../assets/images/fileTypes/DOC.png')} alt=""/>
            }
            else if(extType.includes("ms-excel") || extType.includes("spreadsheetml")  ||extType.includes("ms-excel")){
                return  <img src={require('../../assets/images/fileTypes/XLSX.png')} alt=""/>
            }
            else if(extType.includes("pdf")){
                return  <img src={require('../../assets/images/fileTypes/PDF.png')} alt=""/>
            }
            else if(extType.includes("mp3")){
                return  <img src={require('../../assets/images/fileTypes/MP3.png')} alt=""/>
            }
            else if(extType.includes("mp4")){
                return  <img src={require('../../assets/images/fileTypes/VIDEO.png')} alt=""/>
            }
            else if( extType.includes("vnd.ms-fontobject")||extType.includes("font-woff")||extType.includes("font-woff")||extType.includes("svg+xml")||extType.includes("x-font-opentype")){
                return  <img src={require('../../assets/images/fileTypes/FONT.png')} alt=""/>
            }
            else {
                return  <img src={require('../../assets/images/fileTypes/Blank.png')} alt=""/>

            }
        }

    }
    handleChangeTags(tags) {
        this.setState({tags})
    }

    handleEditFileChange(acceptedFiles, rejectedFiles){
        this.setState({
            newFile:acceptedFiles[0]
        })
        if (rejectedFiles.length>0 ){
            this.props.sharedData.notification({message:'rejected File due to rule ',type:'error'})
        }
    }

    render(){
        let editForm =this.state;
        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Edit File</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="newco-form">
                        <div className="row">
                            <div className="col-lg-6">

                                <Dropzone
                                    className="dropzone"
                                    multiple={false}
                                    onDrop={::this.handleEditFileChange}
                                    maxSize={this.state.maxSize*1000000}
                                    accept={this.state.fileExtensionsRulesString}
                                >
                                    <p>Drag and Drop <br/> or <br/> Click <br/> to Edit File</p>
                                </Dropzone>

                            </div>
                            <div className="col-lg-6 edit-image-container">
                                {this.renderImage()}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="">title</label>
                                    <input type="text"  className="newco-text-input" name="title" value={editForm.title} onChange={::this.handleEditFormChanges}/>
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="">FileType</label>

                                <select name="fileType"  className="newco-text-input" value={editForm.fileType ? editForm.fileType._id :''} onChange={::this.handleEditFormChanges}>
                                    <option value="" selected> Any</option>
                                    {this.props.sharedData.availableFileTypes.map(fileType =>
                                        <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                    )};
                                </select>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="">description</label>
                                    <input type="text"  className="newco-text-input  newco-description" name="description" value={editForm.description} onChange={::this.handleEditFormChanges}/>
                                </div>

                            </div>
                            <div className="col-lg-6">

                                <label htmlFor="tags">Tags:</label>
                                <TagsInput className="newco-text-input newco-tags" value={this.state.tags} onChange={::this.handleChangeTags} />

                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <a className="newco-button light-red-background" onClick={()=>{this.props.closeEditModal()}}>Close</a>
                    <a className="newco-button dark-yellow-background" onClick={::this.handleSubmitEditFile}>edit</a>
                </Modal.Footer>
            </div>
        )
    }
}