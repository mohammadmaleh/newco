import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import BrowseFileSearch from './BrowseFileSearch'
import FileListObject from './FileListObject'
import BrowsingPanel from './BrowsingPanel'
import {postFiles,deleteFile} from 'filesAPI'
import moment from 'moment'
import {getUserInfo} from 'storage'
import AddFileModal from 'AddFIleModal'
import EditFileModal from './EditFileModal'
import {downloadFile} from 'filesApi'
import {Accordion,Panel} from 'react-bootstrap'

export default class BrowseFiles extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            startDate:'',
            endDate:'',

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



    showBrowser(files){
        this.setState({
            showBrowser:true,
            files
        })
    }

    renderRows(){
        let {files} = this.state;
        let {fileTypeList} = this.props.sharedData;
        //pick up the main headers of the tree
        let headers = fileTypeList.filter(object => {
            return !object.father;
        });
        // render the main header of the tree
        return headers.map((row)=>{
            return <FileListObject key={row._id} row={row}  handleBrowseFile={::this.handleBrowseFile}  sharedData={this.props.sharedData} files={files}/>
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
        this.props. sharedData.refreshRulesAndFileTypes();
        this.setState({
            showAddFileModal:true
        })

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
        window.open('/api/download/'+id)
        // downloadFile(id)
        //     .then(res => {
        //         console.log(res)
        //         window.open('/download');
        //     })
        //     .catch(e=>{
        //         console.log(e)
        //
        //     })
    }
    findFiles(){
        let {files} = this.state;
        if(files){
            let childrenFiles = files.file.filter( object => {
                return !object.fileType ;
            });

            if (childrenFiles.length > 0 ){

                return childrenFiles.map((row)=>{
                    return <li className="list-group-item" key={row._id} onClick={(e)=>{    e.stopPropagation(); this.handleBrowseFile(row)}}>
                            <div className="row">
                                <div className="col-lg-4 short-text" >    {row.title}</div>
                                <div className="col-lg-4">   {row.uploadedBy}</div>
                                <div className="col-lg-4">  {moment.unix(row.uploadedAt).format('DD/MM/YYYY')}</div>
                            </div>



                        </li>

                })
            }
        }





    }

    handleSubmitDelete(){
        let id = this.state.selectedBrowseFile._id;
        deleteFile(id)
            .then((res)=>{
                console.log(res)
                this.props.sharedData.notification({message:'deleted Successfully',type:'success'});
                this.setState({
                    showDeleteModal:false
                })
            })
            .catch((e)=>{
                this.props.sharedData.notification({message:'something went wrong try again later ',type:'error'})

            })

    }
    render(){

        return(
            <div className="browse-files">

                <BrowseFileSearch showBrowser={::this.showBrowser} sharedData={this.props.sharedData}/>
                <div className=" body-container light-grey-background">
                    <div className=" container">
                        <div className="row">
                            <div className="col-lg-8 ">
                                <div  className="newco-browser white-background">
                                    <div className="browser-header">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h3>Browse Files</h3>
                                            </div>
                                            <div className="col-lg-4">
                                                <a className="newco-button main-button light-green-background" onClick={::this.showAddFileModal}>Add Files</a>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="browser-body">
                                        <div className="rows-container">
                                            {
                                                this.state.showBrowser  ?
                                                    <div>
                                                        <div>
                                                            <div className="row normal-blue-background browse-file-header">
                                                                <div className="col-lg-4">File Name</div>
                                                                <div className="col-lg-4">Uploaded By</div>
                                                                <div className="col-lg-4">Upload By</div>
                                                            </div>
                                                            <div className=" rule-list list-group" >
                                                                {this.findFiles()}
                                                            </div>
                                                            {this.renderRows()}
                                                        </div>

                                                    </div>



                                                    :
                                                    <div className="browser-empty">
                                                        Waiting for Search results ....
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="col-lg-4">
                                <div  className="newco-panel white-background">
                                    <div className="panel-header">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h3>Panel</h3>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="panel-body">
                               

                                        {this.state.selectedBrowseFile ?
                                            <BrowsingPanel file={this.state.selectedBrowseFile}  showEditModal={::this.showEditModal} showDeleteModal={::this.showDeleteModal} sharedData={this.props.sharedData} />
                                            :
                                            <div className="browser-empty-container">
                                                <div className="browser-empty">
                                                    Waiting File Selection ...
                                                </div>
                                            </div>

                                        }

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <Modal dialogClassName="add-modal" show={this.state.showAddFileModal} bsSize="large" onHide={::this.closeAddFileModal}>
                    <AddFileModal sharedData={this.props.sharedData} closeAddFileModal={::this.closeAddFileModal}/>

                </Modal>




                <Modal dialogClassName="edit-modal" show={this.state.showEditModal} onHide={::this.closeEditModal}>
                    <EditFileModal editForm={this.state.editForm} sharedData={this.props.sharedData} closeEditModal={::this.closeEditModal}/>

                </Modal>





                <Modal  dialogClassName="delete-modal" show={this.state.showDeleteModal} onHide={::this.closeDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><h3>Delete File</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are u sure you want to delete {this.state.selectedBrowseFile ?  this.state.selectedBrowseFile.title :''} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <a className="newco-button dark-yellow-background" onClick={::this.closeDeleteModal}>Close</a>
                        <a className="newco-button light-red-background" onClick={::this.handleSubmitDelete}>Delete</a>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}