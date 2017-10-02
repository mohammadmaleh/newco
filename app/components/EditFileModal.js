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
        this.props.editForm.image = ''
        this.props.editForm.newFile = null

        this.setState(this.props.editForm)
    }

    handleEditFormChanges(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'fileType')
            this.setState({
                newFile:null
            })
        this.setState({
            [name]: value

        });

    }

    handleSubmitEditFile(){
        let{title,fileType,description,tags,_id,file,newFile} = this.state;
        if (title.length > 0 ){
            if (fileType === '')
                fileType = null;
            let EditObject = new FormData()
            EditObject.append('title',title)
            EditObject.append('fileType',fileType)
            EditObject.append('tags',tags)
            EditObject.append('newFile',newFile)
            EditObject.append('description',description)
            if (newFile)
                EditObject.append('type',newFile.type)


            patchFiles(_id,EditObject)
                .then((res)=>{
                    this.props.sharedData.notification({message:'Edited successfully',type:'success'})

                })
                .catch((e)=>{
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

                })


        }


    }
    renderImage(){
        let file =this.state;
        let extType = file.type
        if (file.newFile)
            return <img src={file.newFile.preview} alt=""/>
        else {
            if (extType.includes("image")){
                return <img src={file.image} alt=""/>
                // return <img src={require('../assets/images/pogba.png')} alt=""/>

            }

            else if(extType.includes("msword") || extType.includes("wordprocessingml")  ||extType.includes("ms-word")){
                return  <img src={require('../assets/images/fileTypes/Doc.png')} alt=""/>
            }
            else if(extType.includes("ms-excel") || extType.includes("spreadsheetml")  ||extType.includes("ms-excel")){
                return  <img src={require('../assets/images/fileTypes/XLSX.png')} alt=""/>
            }
            else if(extType.includes("pdf")){
                return  <img src={require('../assets/images/fileTypes/PDF.png')} alt=""/>
            }
            else if(extType.includes("mp3")){
                return  <img src={require('../assets/images/fileTypes/MP3.png')} alt=""/>
            }
            else if(extType.includes("mp4")){
                return  <img src={require('../assets/images/fileTypes/VIDEO.png')} alt=""/>
            }
            else if( extType.includes("vnd.ms-fontobject")||extType.includes("font-woff")||extType.includes("font-woff")||extType.includes("svg+xml")||extType.includes("x-font-opentype")){
                return  <img src={require('../assets/images/fileTypes/FONT.png')} alt=""/>
            }
            else {
                return  <img src={require('../assets/images/fileTypes/Blank.png')} alt=""/>

            }
        }

    }
    handleChangeTags(tags) {
        this.setState({tags})
        this.props.handleFilesChanges('tags',tags,this.props.file.id)
    }

    handleEditFileChange(acceptedFiles, rejectedFiles){
        this.setState({
            newFile:acceptedFiles[0]
        })




    }

    render(){
        let editForm =this.state

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
                                    maxSize={this.state.maxSize}
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
                                    {this.props.sharedData.availableFileTypeList.map(fileType =>
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
                                <TagsInput className="newco-text-input newco-tag" value={this.state.tags} onChange={::this.handleChangeTags} />

                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={()=>{this.props.closeEditModal()}}>Close</button>
                    <button className="btn btn-success" onClick={::this.handleSubmitEditFile}>edit</button>
                </Modal.Footer>
            </div>
        )
    }
}