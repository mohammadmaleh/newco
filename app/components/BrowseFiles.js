import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import BrowseFileSearch from 'BrowseFileSearch'
import BrowsingRow from 'BrowsingRow'
import BrowsingPanel from 'BrowsingPanel'
import {postFiles,deleteFile} from 'filesAPI'
import moment from 'moment'
import {getUserInfo} from 'storage'
import AddFileModal from 'AddFileModal'
import EditFileModal from 'EditFileModal'
import {downloadFile} from 'filesApi'

export default class BrowseFiles extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            startDate:'',
            endDate:'',
            fileTypeList:[],
            showBrowser:false,
            selectedBrowseFile:null,
            files:[],
            showAddFileModal:false,
            addFile:{
                title:'',
                description:'',
                tags:[],
                fileType:null,
                file:[]
            },
            editForm: {
                title: '',
                description: '',
                tags: [],
                fileType: ''

            }

        }

    }
    componentWillReceiveProps(nextProps) {
        this.setState({fileTypeList: nextProps.fileTypeList});
    }


    showBrowser(files){
        this.setState({
            showBrowser:true,
            files
        })
    }

    renderRows(){
        let {fileTypeList,files} = this.state;
        //pick up the main headers of the tree
        let headers = fileTypeList.filter(object => {
            return !object.father;
        });
        // render the main header of the tree
        return headers.map((row)=>{
            return <BrowsingRow key={row._id} row={row}  handleBrowseFile={::this.handleBrowseFile}  fileTypeList={fileTypeList} files={files}/>
        })

    }
    handleBrowseFile(selectedBrowseFile){
        this.setState({
            selectedBrowseFile
        })
    }
    closeAddFileModal(){
        this.setState({
            showAddFileModal:false
        })
    }
    showAddFileModal(){
        this.setState({
            showAddFileModal:true
        })

    }
    handleAddNameFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState(prevState => ({
            addFile: {
                ...prevState.addFile,
                [name]: value
            }
        }));
    }
    closeEditModal(){
        this.setState({
            showEditModal:false
        })
    }
    showEditModal(){
        this.setState({
            showEditModal:true,
            editForm:this.state.selectedBrowseFile
        })

    }
    closeDeleteModal(){
        this.setState({
            showDeleteModal:false

        })
    }
    showDeleteModal(){
        this.setState({
            showDeleteModal:true
        })
    }
    handleDownloadFile(id){
        console.log('downloading')
        downloadFile(id)
            .then(res => {
                console.log(res)
                window.open('/download');
            })
            .catch(e=>{
                console.log(e)

            })
    }
    findFiles(){
        let {files} = this.state;
        // pick the children of this row

        if(files){
            let childrenFiles = files.file.filter( object => {
                return !object.fileType ;
            });

            // // if this row has children render them using this same component, until there is no children left under this row
            if (childrenFiles.length > 0 ){

                return childrenFiles.map((row)=>{
                    return <div className="list-group" key={row._id}>
                        {/*<BrowsingRow  handleDeleteFileType ={this.props.handleDeleteFileType} handleEditFileType={this.props.handleEditFileType} row={row}  fileTypeList={fileTypeList}/>*/}
                        <li className="list-group-item" onClick={(e)=>{    e.stopPropagation(); this.handleBrowseFile(row)}}>
                            {row.title}
                            {row.uploadedBy}
                            {row.uploadedAt}
                            <div onClick={()=>{this.handleDownloadFile(row._id)}}> download</div>
                        </li>
                    </div>
                })
            }
        }





    }

    handleSubmitDelete(){
        let id = this.state.selectedBrowseFile._id
        deleteFile(id)
            .then((res)=>{
                console.log(res)
            })
            .catch((e)=>{

            })

    }
    render(){
        return(
            <div className="browse-files">

                <BrowseFileSearch showBrowser={::this.showBrowser}fileTypeList={this.props.fileTypeList}/>
                <button className="btn-success btn " onClick={::this.showAddFileModal}>Add files</button>
                {
                    this.state.showBrowser  ?
                        <div className="row">
                            <div className="col-lg-8">
                                {this.findFiles()}

                                {this.renderRows()}
                            </div>
                            <div className="col-lg-4">
                                {this.state.selectedBrowseFile ?
                                    <BrowsingPanel file={this.state.selectedBrowseFile} showEditModal={::this.showEditModal} showDeleteModal={::this.showDeleteModal}/>
                                :''}
                            </div>
                        </div>
                        :''
                }
                <Modal show={this.state.showAddFileModal} bsSize="large" onHide={::this.closeAddFileModal}>
                    <AddFileModal fileTypeList={this.state.fileTypeList} closeAddFileModal={::this.closeAddFileModal}/>

                </Modal>




                <Modal show={this.state.showEditModal} onHide={::this.closeEditModal}>
                    <EditFileModal editForm={this.state.editForm} fileTypeList={this.state.fileTypeList} closeEditModal={::this.closeEditModal}/>

                </Modal>





                <Modal show={this.state.showDeleteModal} onHide={::this.closeDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are u sure you want to delete {this.state.selectedBrowseFile ?  this.state.selectedBrowseFile.title :''} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeDeleteModal}>Close</button>
                        <button className="btn btn-dange" onClick={::this.handleSubmitDelete}>Delete</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}