import React,{Component} from 'react'
import HierarchicalTableRow from 'HierarchicalTableRow'
import FileTypesMangerPanel from 'FileTypesMangerPanel'
import {deleteFileType} from 'fileTypeAPI'
import{Modal} from 'react-bootstrap'
export default class FileTypesManager extends Component{
    constructor(){
        super()
        this.state={
            fileTypeList:[],
            editedFileType:{},
            deletedFileType:{},
            showModal:false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({fileTypeList: nextProps.fileTypeList});
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
    closeModal(){
        this.setState({
            showModal:false
        })
    }
    deleteRow() {
        let {deletedFileType} = this.state;
        deleteFileType(deletedFileType._id)
            .then((res)=>{
                console.log(res)

            }).catch((e)=>{
            console.log(e)
        })
        this.closeModal()
    }
    renderRows(){
        let {fileTypeList} = this.state;
        //pick up the main headers of the tree
        let headers = fileTypeList.filter(object => {
            return !object.father;
        });
        // render the main header of the tree
        return headers.map((row)=>{
            return <HierarchicalTableRow key={row._id} row={row} handleEditFileType={::this.handleEditFileType} handleDeleteFileType={::this.handleDeleteFileType} fileTypeList={fileTypeList}/>
        })

    }    render(){
        return(
            <div className="container file-type-manager">
                <div className="row">
                    <div className="col-lg-6 file-type-manager-browse ">
                        {this.renderRows()}
                    </div>
                    <div className="col-lg-6 file-type-manager-panel">
                        <FileTypesMangerPanel  editedFileType={this.state.editedFileType} fileTypeList={this.state.fileTypeList}></FileTypesMangerPanel>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={::this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are you sure that you to delete {this.state.deletedFileType.name} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeModal}>Close</button>
                        <button className="btn btn-dange" onClick={::this.deleteRow}>Delete</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}