/**
 * Created by mohammadmaleh on 30/09/2017.
 */
import React,{Component} from 'react'
import{Modal} from 'react-bootstrap'
import moment from 'moment'
import Dropzone from 'react-dropzone'
import {patchFiles} from 'filesAPI'
import {getUserInfo} from 'storage'


export default class EditFileModal  extends Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.props.editForm.image = ''
        this.props.editForm.newFile = null
        if (this.props.editForm.type.includes("image"))
            this.importImage(this.props.editForm.filePath);

        this.setState(this.props.editForm)
    }
    importImage(filePath){
        let url = filePath.split("/").pop()

        let that = this;

        import('../../uploads/' + url)
            .then(res=>{
                that.setState({
                    image:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleEditFormChanges(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
            if (newFile)
                EditObject.append('type',newFile.type)


            patchFiles(_id,EditObject)
                .then((res)=>{
                    console.log(res)
                })
                .catch((e)=>{

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
    handleEditFileChange(files){
        this.setState({
            newFile:files[0]
        })




    }

    render(){
        let editForm =this.state

        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="form-control">
                            <label htmlFor="">title</label>
                            <input type="text" name="title" value={editForm.title} onChange={::this.handleEditFormChanges}/>
                        </div>
                        <Dropzone
                            className="dropzone"
                            multiple={false}
                            onDrop={::this.handleEditFileChange}
                        >
                            <p>Drag and Drop <br/> or <br/> Click <br/> to upload :)</p>
                        </Dropzone>
                        {this.renderImage()}

                        <div className="form-control">
                            <label htmlFor="">description</label>
                            <input type="text" name="description" value={editForm.description} onChange={::this.handleEditFormChanges}/>
                        </div>
                        <select name="fileType"  value={editForm.fileType ? editForm.fileType._id :''} onChange={::this.handleEditFormChanges}>
                            <option value="" selected> Any</option>
                            {this.props.sharedData.fileTypeList.map(fileType =>
                                <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                            )};
                        </select>

                        <div className="form-control">
                            <label htmlFor="">title</label>
                            <input type="text" value={editForm.title} onChange={::this.handleEditFormChanges}/>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={()=>{this.props.closeEditModal()}}>Close</button>
                    <button className="btn btn-success" onClick={::this.handleSubmitEditFile}>edit</button>
                </Modal.Footer>
            </div>
        )
    }
}