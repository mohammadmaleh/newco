/**
 * Created by mohammadmaleh on 30/09/2017.
 */
import React,{Component} from'react'
import TagsInput from 'react-tagsinput'
import {Glyphicon} from 'react-bootstrap'
export default class FileObject extends Component{
    constructor(props){
        super(props)
        this.state ={
            tags:[],
            file:{}
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.file);
    }
    componentWillMount() {
        this.setState(this.props.file);
    }

    handleChangeTags(tags) {
        this.setState({tags})
        this.props.handleFilesChanges('tags',tags,this.props.file.id)
    }

    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
        this.props.handleFilesChanges(name,value,this.props.file.id)

    }
    renderImage(){
        let file =this.state;
        let extType = file.type
        if (extType.includes("image")){
            return <img src={file.file.preview} alt=""/>

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


    render(){
        let file =this.state;
        return(
            <div className="file-object newco-form">
                <Glyphicon  glyph="remove" onClick={()=>{this.props.handleRemoveFile(file.id)}} />
                {this.renderImage()}
                <input type="text" placeholder="Title" className="newco-text-input" name="title" value={file.title} onChange={::this.handleFormChange}/>
                <TagsInput value={this.state.tags} className="newco-text-input tags-search" onChange={::this.handleChangeTags} />

                <textarea name="description"  placeholder="Description" className="newco-text-input tags-search" value={file.description} onChange={::this.handleFormChange} ></textarea>
            </div>
        )
    }
}