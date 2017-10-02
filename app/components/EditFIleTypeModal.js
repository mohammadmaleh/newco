/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import {patchFileTypes} from 'fileTypeAPI'
export default class EditFIleTypeModal extends  Component{
    constructor(){
        super()
        this.state= {
        }
    }
    componentWillMount(){
        let selectedFileType = this.props.selectedFileType

        if(!selectedFileType.rule._id )
            selectedFileType.rule = ''
        else
          selectedFileType.rule = selectedFileType.rule._id
        this.setState(selectedFileType)
    }
    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }
    editFileType(){
        let{name,father,_id,rule} = this.state;
        console.log(rule)
        let{sharedData} = this.props
        if (name.length>0 ){
            if (father === '')
                father=null;
            if(rule === '')
                rule = null
            let createObject={
                name,
                father,
                rule:rule

            }
            console.log(createObject)
            patchFileTypes(_id,createObject)
                .then((res)=>{
                    console.log(res)
                    sharedData.refreshRulesAndFileTypes();
                    this.props.closeEditModal()
                    this.props.sharedData.notification({message:'Edited Successfully',type:'success'})

                })
                .catch((e)=>{
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

                    console.log(e)
                })


        }
    }
    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <div>

                <Modal.Header closeButton>
                    <Modal.Title><h3>Edit File Type</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row">

                        <div className="add-filetype-form">
                            <div className="form-control">
                                <label htmlFor="name">name</label>
                                <input type="text" name="name" onChange={::this.handleFormChange} value={this.state.name}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="father">father</label>
                                <select name="father"  value={this.state.father} onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.fileTypeList.map(fileType =>
                                        <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                    )};
                                </select>

                            </div>
                            <select name="rule" value={this.state.rule} onChange={::this.handleFormChange}>
                                <option value="" selected> none</option>
                                {this.props.sharedData.rulesList.map(rule =>
                                    <option key={rule._id} value={rule._id}>{rule.name}</option>
                                )};
                            </select>

                            <div className=" form-control">
                                <label htmlFor="createdBy"> created by</label>
                                <p>{this.state.createdBy}</p>
                            </div>
                            <div className=" form-control">
                                <label htmlFor="createdBy"> created At</label>
                                <p>{this.state.createdAt}</p>
                            </div>
                            <div className="form-control">
                                <button className="btn-success" onClick={::this.editFileType}>Edit</button>
                            </div>
                        </div>


                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={()=>{this.props.closeEditModal()}}>Close</button>
                    <button className="btn btn-success" onClick={::this.editFileType}>Edit</button>
                </Modal.Footer>

            </div>

        )
    }
}