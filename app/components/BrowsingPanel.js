import React,{Component} from 'react'
import{Modal}from 'react-bootstrap'
export default class BrowsingPanel extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            showDeleteModal:false,
            showEditModal:false,
            image:null,
            file:{}
        }

    }
    importImage(filePath){
        let url = filePath.split("/").pop()

        let that = this;
        this.setState({
            image: '../..' + filePath
        })
        // import('../../uploads/' + url)
        //     .then(res=>{
        //         console.log(res)
        //         that.setState({
        //             image:res
        //         })
        // }).catch(e=>{
        //     console.log(e)
        // })
    }
    componentWillReceiveProps(nextProps) {

        nextProps.file.image = ''
        if (nextProps.file.type.includes("image"))
            this.importImage(nextProps.file.filePath);



        this.setState(nextProps.file);
    }
    componentWillMount() {

        this.props.file.image=  '';
        if (this.props.file.type.includes("image"))
            this.importImage(this.props.file.filePath);

        this.setState(this.props.file);
    }
    renderImage(){
        let file =this.state;
        let extType = file.type
        if (extType.includes("image")){
            return <img src={file.image} alt=""/>

        }
        else if(extType.includes("ms-excel") || extType.includes("wordprocessingml")  ||extType.includes("ms-word")){
            return  <img src={require('../assets/images/fileTypes/Doc.png')} alt=""/>
        }
        else if(extType.includes("msword") || extType.includes("spreadsheetml")  ||extType.includes("ms-excel")){
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

    renderImage(){
        let file =this.state;
        let extType = file.type
        if (extType.includes("image")){
            return  <img src={this.state.image} alt=""/>

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
        else if( extType.includes("zip")||extType.includes("x-rar")){
            return  <img src={require('../assets/images/fileTypes/ZIP.png')} alt=""/>
        }
        else {
            return  <img src={require('../assets/images/fileTypes/Blank.png')} alt=""/>

        }
    }

    showEditModal(){
        this.props.showEditModal();
    }

    showDeleteModal(){
       this.props.showDeleteModal();
    }
    render(){
        let file = this.state ;
        return(
            <div className="browsing-panel">
                {this.renderImage()}
                 name : {file.title}
                 description : {file.description}
                 Uploaded at : {file.uploadedAt}
                 Uploaded by : {file.uploadedBy}
                 tags  : {file.tags}
                 file   : {file.fileType? file.fileType.name :'none'}
                 <button className="btn btn-info" onClick={::this.showEditModal}>edit</button>
                 <button className="btn btn-delete" onClick={::this.showDeleteModal} >delete</button>



            </div>
        )
    }

}