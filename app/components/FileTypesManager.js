import React,{Component} from 'react'
import HierarchicalTableRow from 'HierarchicalTableRow'
import FileTypesMangerPanel from 'FileTypesMangerPanel'
import {deleteFileType} from 'fileTypeAPI'
import AddFIleTypeModal from 'AddFIleTypeModal'
import EditFIleTypeModal from 'EditFIleTypeModal'
import{Modal} from 'react-bootstrap'
export default class FileTypesManager extends Component{
    constructor(){
        super()
        this.state={
            editedFileType:{},
            deletedFileType:{},
            showDeleteModal:false,
            showEditModal:false,
            showAddModal:false,
            selectedFileType:{}
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
    ShowOrHideAddModal(){

        this.setState({
            showAddModal:!this.state.showAddModal
        })
    }
    openAddModal(){
        this.setState({
            showAddModal:true
        })
    }
    deleteRow() {
        let {selectedFileType} = this.state;
        deleteFileType(selectedFileType._id)
            .then((res)=>{
                console.log(res)

            }).catch((e)=>{
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
                return <HierarchicalTableRow key={row._id} row={row} handleSelectFileType={::this.handleSelectFileType}  sharedData={this.props.sharedData}/>
            })
        }


    }    render(){
        return(
            <div className="container file-type-manager">
                <div className="row">
                    <button className="btn btn-success" onClick={::this.ShowOrHideAddModal}>add file type</button>
                </div>
                <div className="row">
                    <div className="col-lg-6 file-type-manager-browse ">
                        {this.renderRows()}
                    </div>
                    <div className="col-lg-6 file-type-manager-panel">
                        <FileTypesMangerPanel  openDeleteModal={::this.openDeleteModal} openEditModal={::this.openEditModal} selectedFileType={this.state.selectedFileType}/>
                    </div>
                </div>
                {/*delete modal*/}
                <Modal dialogClassName="delete-modal" show={this.state.showDeleteModal} onHide={::this.closeDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><h3></h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are you sure that you to delete {this.state.deletedFileType.name} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeDeleteModal}>Close</button>
                        <button className="btn btn-dange" onClick={::this.deleteRow}>Delete</button>
                    </Modal.Footer>
                </Modal>
                {/*edit modal*/}
                <Modal show={this.state.showEditModal} onHide={::this.closeEditModal}>
                    <EditFIleTypeModal selectedFileType={this.state.selectedFileType} closeEditModal={::this.closeEditModal} sharedData={this.props.sharedData}/>
                </Modal>
                {/*add modal*/}
                <Modal show={this.state.showAddModal} onHide={::this.ShowOrHideAddModal}>
                    <AddFIleTypeModal sharedData={this.props.sharedData} allRules={this.props.allRules} closeAddModal={::this.ShowOrHideAddModal}/>
                </Modal>
            </div>
        )
    }
}