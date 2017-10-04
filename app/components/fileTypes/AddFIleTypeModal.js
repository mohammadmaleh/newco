/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
import{getUserInfo} from 'storage'
import {postFileTypes} from 'fileTypeAPI'
export default class AddFIleTypeModal extends  Component{
    constructor(){
        super()
        this.state={
            rule:""
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
    createFileType(){
        let{name,father,rule} = this.state;
        if (name.length>3 ){
            if (father === '')
                father=null;
            if (rule === '')
                rule=null;

            let createObject={
                name,
                rule,
                father,
                createdAt:moment().unix(),
                createdBy:getUserInfo().username
            }
            postFileTypes(createObject)
                .then((res)=>{
                    this.props.sharedData.refreshRulesAndFileTypes();

                    this.props.closeAddModal()
                    this.props.sharedData.notification({message:'Your file type has been added successfully',type:'success'})

                })
                .catch((e)=>{
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})
                })
        }
        else{
            this.sharedData.notification({message:'name must be more than 4 characters',type:'error'})
        }
    }
    render(){
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Add File Type</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="newco-form">

                        <div className="row">
                            <div className="col-lg-6">
                                <label htmlFor="">Name:</label>
                                <input  className="newco-text-input" type="text" name="name" onChange={::this.handleFormChange} value={this.state.name}/>
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="">Father File Type:</label>
                                <select  className="newco-text-input" name="father" onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.availableFileTypes.map(fileType =>
                                        <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                    )};
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label htmlFor="rule">Rule:</label>
                                <select  className="newco-text-input" name="rule" onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.rulesList.map(rule =>
                                        <option key={rule._id} value={rule._id}>{rule.name}</option>
                                    )};
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <a className="newco-button dark-yellow-background " onClick={this.props.closeAddModal}>Close</a>
                    <a className="newco-button dark-green-background margin-left-15" onClick={::this.createFileType}>Create</a>
                </Modal.Footer>
            </div>

        )
    }
}