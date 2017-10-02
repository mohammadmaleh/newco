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
        if (name.length>0 ){
            if (father === '')
                father=null;
            if (rule === '')
                father=null;

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
                    console.log(res)
                })
                .catch((e)=>{

                })


        }
    }

    render(){
        return (
            <div>


                <Modal.Header closeButton>
                    <Modal.Title>add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">

                        <div className="add-filetype-form">
                            <div className="form-control">
                                <label htmlFor="name">name</label>
                                <input type="text" name="name" onChange={::this.handleFormChange} value={this.state.name}/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="father">fatherrrrrr</label>
                                <select name="father" onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.fileTypeList.map(fileType =>
                                        <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                    )};
                                </select>

                            </div>
                            <div className="form-control">
                                <label htmlFor="rule">rule</label>
                                <select name="rule" onChange={::this.handleFormChange}>
                                    <option value="" selected> none</option>
                                    {this.props.sharedData.rulesList.map(rule =>
                                        <option key={rule._id} value={rule._id}>{rule.name}</option>
                                    )};
                                </select>

                            </div>
                            <div className="form-control">
                            </div>
                        </div>


                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-success" onClick={this.props.ShowOrHideAddModal}>Close</button>
                    <button className="btn-success" onClick={::this.createFileType}>Create</button>

                </Modal.Footer>

            </div>

        )
    }
}