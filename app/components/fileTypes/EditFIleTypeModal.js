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
        if(!selectedFileType.rule )
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
        if (name.length>3 ){
            if (father === '')
                father=null;
            if(rule === '')
                rule = null
            let createObject={
                name,
                father,
                rule:rule

            }
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
        else{
            this.sharedData.notification({message:'name must be more than 4 characters',type:'error'})

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
                    <div className=" newco-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <label htmlFor="name">name</label>
                                <input type="text"  className="newco-text-input" name="name" onChange={::this.handleFormChange} value={this.state.name}/>
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="father">father</label>
                                <select name="father" className="newco-text-input" value={this.state.father} onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.availableFileTypes.map(fileType =>
                                        <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                    )};
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <select name="rule"  className="newco-text-input" value={this.state.rule} onChange={::this.handleFormChange}>
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
                    <a className="newco-button light-red-background" onClick={()=>{this.props.closeEditModal()}}>Close</a>
                    <a className="newco-button dark-yellow-background" onClick={::this.editFileType}>Edit</a>
                </Modal.Footer>

            </div>

        )
    }
}