import React,{Component} from 'react'
import FileTypeListObject from 'FileTypeListObject'
import FileTypesMangerPanel from 'FileTypesMangerPanel'
import {deleteFileType} from 'fileTypeAPI'
import AddFIleTypeModal from 'AddFIleTypeModal'
import EditFIleTypeModal from 'EditFIleTypeModal'
import{Modal} from 'react-bootstrap'
export default class FileTypesManager extends Component{
    constructor(){
        super()
        this.state= {
            editedFileType: {},
            deletedFileType: {},
            showDeleteModal: false,
            showEditModal: false,
            showAddModal: false,
            selectedFileType: null
        }
    }
    handleSelectFileType(row){
        this.setState({
            selectedFileType: row
        })
    }
    handleEditFileType(fileType){
      this.setState({
          editedFileType:fileType
      })
    }
    handleDeleteFileType(fileType){
        this.setState({
            deletedFileType:fileType,
            showModal:true
        })

    }
    closeDeleteModal(){
        this.setState({
            showDeleteModal:false
        })
    }
    openDeleteModal(){
        this.setState({
            showDeleteModal:true
        })
    }
    closeEditModal(){
        this.setState({
            showEditModal:false
        })
    }
    openEditModal(){
        this.setState({
            showEditModal:true
        })
    }
    openAddModal(){
        this.setState({
            showAddModal:true
        })
    }
    closeAddModal(){
        this.setState({
            showAddModal:true
        })
    }
    deleteRow() {
        let {selectedFileType} = this.state;
        deleteFileType(selectedFileType._id)
            .then((res)=>{
                this.props.sharedData.notification({message:'Deleted successfully',type:'success'})

                console.log(res)

            }).catch((e)=>{
            this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

            console.log(e)
        })
        this.closeModal()
    }
    renderRows(){
        let {fileTypeList} = this.props.sharedData;
        //pick up the main headers of the tree
        if (fileTypeList){
            let headers = fileTypeList.filter(object => {
                return !object.father;
            });
            // render the main header of the tree
            return headers.map((row)=>{
                return <FileTypeListObject key={row._id} row={row} handleSelectFileType={::this.handleSelectFileType}  sharedData={this.props.sharedData}/>
            })
        }


    }    render(){
        return(
            <div className=" body-container light-grey-background">
                <div className=" container">
                    <div className="row">
                        <div className="col-lg-8 ">
                            <div  className="newco-browser white-background">
                                <div className="browser-header">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h3>Browse File Type</h3>
                                        </div>
                                        <div className="col-lg-4">
                                            <a className="newco-button main-button light-green-background" onClick={::this.openAddModal} >Add File Type</a>

                                        </div>
                                    </div>
                                </div>
                                <div className="browser-body">
                                    <div className="rows-container">
                                        {
                                            this.props.sharedData.fileTypeList.length>0  ?
                                                <div>
                                                    <div>
                                                        <div className="row filetypeheader"  >
                                                            <div className="col-lg-3">Name</div>
                                                            <div className="col-lg-3">Rule</div>
                                                            <div className="col-lg-3">Created At</div>
                                                            <div className="col-lg-3">Created By</div>

                                                        </div>
                                                        {this.renderRows()}

                                                    </div>

                                                </div>



                                                :
                                                <div className="browser-empty">
                                                    No File Types Available ....
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
                                    {this.state.selectedFileType ?
                                        <FileTypesMangerPanel  openDeleteModal={::this.openDeleteModal} openEditModal={::this.openEditModal} selectedFileType={this.state.selectedFileType}/>

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
                <Modal dialogClassName="delete-modal" show={this.state.showDeleteModal} onHide={::this.closeDeleteModal}>
                    <Modal.Header closeButton bsClass="light-red-background">
                        <Modal.Title><h3>Delete</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are you sure that you to delete {this.state.deletedFileType.name} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <a className="newco-button dark-yellow-background" onClick={::this.closeDeleteModal}>Close</a>
                        <a className="newco-button light-red-background" onClick={::this.deleteRow}>Delete</a>
                    </Modal.Footer>
                </Modal>
                {/*edit modal*/}
                <Modal show={this.state.showEditModal} onHide={::this.closeEditModal}>
                    <EditFIleTypeModal selectedFileType={this.state.selectedFileType} closeEditModal={::this.closeEditModal} sharedData={this.props.sharedData}/>
                </Modal>
                {/*add modal*/}
                <Modal show={this.state.showAddModal} onHide={::this.openAddModal}>
                    <AddFIleTypeModal sharedData={this.props.sharedData} allRules={this.props.allRules} closeAddModal={::this.openAddModal}/>
                </Modal>

            </div>

        )
    }
}