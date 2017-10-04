import React,{Component} from 'react'
import moment from 'moment'
import uuid from 'uuid/v4'
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
        this.setState({
            image:filePath
        })
    }
    componentWillReceiveProps(nextProps) {

        nextProps.file.image = '';
        if (nextProps.file && nextProps.file.type.includes("image"))
            this.importImage(nextProps.file.filePath);



        this.setState(nextProps.file);
    }
    componentWillMount() {

        this.props.file.image=  '';
        if (this.props.file.file && this.props.file.type.includes("image"))
            this.importImage(this.props.file.filePath);

        this.setState(this.props.file);
    }

    renderImage(){
        let file =this.state;
        let extType = file.type;
        if(file.type){
            if (extType.includes("image")){
                return  <img src={'/'+file.filePath} alt=""/>
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
            else if( extType.includes("zip")||extType.includes("x-rar")){
                return  <img src={require('../../assets/images/fileTypes/ZIP.png')} alt=""/>
            }
            else {
                return  <img src={require('../../assets/images/fileTypes/Blank.png')} alt=""/>

            }
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
            <div className="newco-form">

                <div className="image-container">
                    {this.renderImage()}

                </div>
                <div >
                    <label>Title:</label>
                    <div className="newco-info">
                        {file.title}
                    </div>
                </div>
                <div >
                    <label>File Type:</label>
                    <div className="newco-info">
                        {file.fileType? file.fileType.name :'none'}
                    </div>
                </div>
                <div >
                    <label>Uploaded By:</label>
                    <div className="newco-info">
                        {file.uploadedBy}
                    </div>
                </div>
                <div >
                    <label>Uploaded At:</label>
                    <div className="newco-info">
                        {moment.unix(file.uploadedAt).format('DD/MM/YYYY hh:mm')}
                    </div>
                </div>
                <div >
                    <label>Description:</label>
                    <div className="newco-info">
                        {
                            file.description.length > 0 ? file.description :   'None'
                        }
                    </div>
                </div>
                <div >
                    <label>Tags</label>
                    <div className="newco-info">
                        {  file.tags.length > 0 ?
                            file.tags.map( tag => {
                                return <div key={uuid()} className="newco-info-tag badge inline-block dark-yellow-background margin-right-5"> #{tag}</div>
                            })
                            :   'None'
                        }
                    </div>
                </div>
                <div className="button-group pull-right">
                    <a className="newco-button dark-yellow-background margin-top-15"  onClick={::this.showEditModal}>Edit</a>
                    <a className="newco-button light-red-background" onClick={::this.showDeleteModal} >Delete</a>
                </div>




            </div>
        )
    }

}