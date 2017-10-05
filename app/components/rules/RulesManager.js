/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import RulesBrowser from 'RulesBrowser'
import RulesPanel from 'RulesPanel'
import {postRule,patchRule,deleteRule} from 'rulesAPI'
import moment from 'moment'
import {getUserInfo} from 'storage'
export default class RulesManager extends Component{
    constructor(){
        super()
        this.state = {
            showAddRuleModal:false,
            showDeleteRuleModal:false,
            showEditRuleModal:false,
            selectedRule:null,
            addRuleForm:{
                name:'',
                maxSize:1,
                fileExtensions:{
                    images:false,
                    word:false,
                    excel:false,
                    pdf:false,
                    mp3:false,
                    mp4:false,
                    fonts:false,
                    zip:false,
                }
            },
            editRuleForm:{
                name:'',
                maxSize:1,
                fileExtensions:{}
            }
        }
    }
    handleSelectRule(rule){
        this.setState({
            selectedRule:rule
        })
    }

    handleEditExtensionsChange(event){
        const target = event.target;
        const value = target.checked ;
        const name = target.name;
        let state = this.state
        let {editRuleForm} =  state
        let {fileExtensions} = editRuleForm

        this.setState({
            ...state,
            editRuleForm:{
                ...editRuleForm,
                fileExtensions:{
                    ...fileExtensions,
                    [name]:value
                }
            }
        })




    }
    handleAddRuleFormChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let state = this.state
        let {addRuleForm} =  state
        this.setState({
            ...state,
            addRuleForm:{
                ...addRuleForm,
                [name]:value


            }
        })


    }
    handleEditRuleFormChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let state = this.state
        let {editRuleForm} =  state

        this.setState({
            ...state,
            editRuleForm:{
                ...editRuleForm,
               [name]:value
            }
        })


    }
    renderEditExtensions(){
        let {fileExtensions} = this.state.editRuleForm
        let extentionsHtml = []

        for (var key in fileExtensions) {
            if (fileExtensions.hasOwnProperty(key)) {
                extentionsHtml.push(
                    <div className="form-control">
                        {key}
                        <input type="checkbox" checked={this.state.editRuleForm.fileExtensions[key]} name={key} key={key} onChange={::this.handleEditExtensionsChange}/>
                    </div>
                )
            }
        }
        return extentionsHtml.map(ext=>{
            return <div key={ext}>ext</div>
        })
    }
    closeAddRuleModal(){
        this.setState({
            showAddRuleModal:false
        })
    }
    closeDeleteRuleModal(){
        this.setState({
            showDeleteRuleModal:false
        })
    }
    closeEditRuleModal(){
        this.setState({
            showEditRuleModal:false
        })
    }
    showAddRuleModal(){

        this.setState({
            showAddRuleModal:true,
            addRuleForm:{
                name:'',
                maxSize:1,
                fileExtensions:{
                    images:false,
                    word:false,
                    excel:false,
                    pdf:false,
                    mp3:false,
                    mp4:false,
                    fonts:false,
                    zip:false,
                }
            }
        })
    }
    showDeleteRuleModal(){
        this.setState({
            showDeleteRuleModal:true
        })
    }
    showEditRuleModal(){
        let {selectedRule} = this.state;
        this.setState({
            showEditRuleModal:true,
            editRuleForm:selectedRule

        })
    }
    handleSubmitRule(){
        let {addRuleForm} = this.state
        addRuleForm.createdAt = moment().unix()
        addRuleForm.createdBy = getUserInfo().username
        if (addRuleForm.name.length > 3 ){
            postRule(addRuleForm)
                .then(res =>{

                    this.props.sharedData.refreshRulesAndFileTypes()
                    this.closeAddRuleModal()
                    this.props.sharedData.notification({message:'your rule has been added',type:'success'})

                })
                .catch(e => {
                    console.log(e)
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

                })
        }
        else
        {
            this.props.sharedData.notification({message:'name should be more than 3 characters',type:'error'})

        }

    }
    handleDeleteRule(){
        let {selectedRule} = this.state;
        deleteRule(selectedRule._id)
            .then(res =>{
                 console.log(res)
                this.closeDeleteRuleModal()
                this.props.sharedData.refreshRulesAndFileTypes()
                this.props.sharedData.notification({message:'deleted Succefully',type:'success'})

            })
            .catch(e =>{
                console.log(e)
                this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

            })
    }
    handleEditRule(){
        let {editRuleForm,selectedRule} =  this.state;
        let id = selectedRule._id;
        if (editRuleForm.name.length >3 ){
            patchRule(id,editRuleForm)
                .then(res =>{
                    this.closeEditRuleModal()
                    this.props.sharedData.refreshRulesAndFileTypes()
                    this.props.sharedData.notification({message:'edited successfully',type:'error'})

                })
                .catch(e =>{
                    this.props.sharedData.notification({message:'something went wrong try again later',type:'error'})

                    console.log(e)
                })

        }
        else {
            this.props.sharedData.notification({message:'name should be more than 3 characters',type:'error'})

        }
    }
    handelChangeAddRuleExtension(event){

            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            let state = this.state
            let {addRuleForm} =  state
            let {fileExtensions} =  addRuleForm

        this.setState({
            ...state,
            addRuleForm:{
                ...addRuleForm,
                fileExtensions:{
                    ...fileExtensions,
                    [name]:value
                }
            }
        })



    }
    render(){
        let {addRuleForm,editRuleForm,selectedRule}= this.state

        return(
            <div>
                <div className=" body-container light-grey-background">
                    <div className=" container">
                        <div className="row">
                            <div className="col-lg-8 ">
                                <div  className="newco-browser white-background">
                                    <div className="browser-header">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h3>Rules</h3>
                                            </div>
                                            <div className="col-lg-4">
                                                <a className="newco-button main-button light-green-background" onClick={::this.showAddRuleModal}>Add New Rule</a>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="browser-body">
                                        <div className="rows-container">
                                            <RulesBrowser sharedData={this.props.sharedData} handleSelectRule={::this.handleSelectRule}/>

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
                                        {this.state.selectedRule ?
                                            <RulesPanel showEditRuleModal={::this.showEditRuleModal} showDeleteRuleModal={::this.showDeleteRuleModal}   selectedRule={selectedRule}/>

                                            :
                                            <div className="browser-empty-container">
                                                <div className="browser-empty">
                                                    Waiting Rule Selection ...
                                                </div>
                                            </div>

                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <Modal show={this.state.showAddRuleModal}  onHide={::this.closeAddRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><h3>Add Rule</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="newco-form">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Name:</label>
                                    <input type="text" name='name'  className="newco-text-input" value={addRuleForm.name} onChange={::this.handleAddRuleFormChange}/>
                                </div>
                                <div className="col-lg-6">
                                    <label>Max Size(in MB):</label>
                                    <input type="text" className="newco-text-input" value={addRuleForm.maxSize} name="maxSize" onChange={::this.handleAddRuleFormChange}/>
                                </div>

                            </div>
                            <div className="row extensions-input">
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="images" value={addRuleForm.fileExtensions.images} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>Images</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="word" value={addRuleForm.fileExtensions.word} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>Word</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="excel" value={addRuleForm.fileExtensions.excel} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>Excel</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="pdf" value={addRuleForm.fileExtensions.pdf} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>PDF</a>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="mp3" value={addRuleForm.fileExtensions.mp3} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>MP3</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="mp4" value={addRuleForm.fileExtensions.mp4} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>MP4</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" className="margin-right-10" name="zip" value={addRuleForm.fileExtensions.zip} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>ZIP</a>
                                </div>
                                <div className="col-lg-3">

                                    <input type="checkBox" name="fonts" value={addRuleForm.fileExtensions.fonts} onChange={::this.handelChangeAddRuleExtension}/>
                                    <a>Fonts</a>
                                </div>
                            </div>

                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <a className="newco-button light-red-background margin-right-10" onClick={::this.closeAddRuleModal}>Close</a>
                        <a className="newco-button light-green-background" onClick={::this.handleSubmitRule}>Add</a>
                    </Modal.Footer>

                </Modal>



                <Modal show={this.state.showDeleteRuleModal}  onHide={::this.closeDeleteRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><h3>Delete Rule</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are you sure you want to delete  ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeDeleteRuleModal}>Close</button>
                        <button className="btn btn-danger" onClick={::this.handleDeleteRule}>Delete</button>
                    </Modal.Footer>

                </Modal>
                <Modal show={this.state.showEditRuleModal}  onHide={::this.closeEditRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><h3>Edit Rule</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-control">
                            name <input type="text" name='name' value={editRuleForm.name} onChange={::this.handleEditRuleFormChange}/>

                        </div>
                        <div className="form-control">
                            size <input type="text" value={editRuleForm.maxSize} name="maxSize" onChange={::this.handleEditRuleFormChange}/>
                        </div>
                        {this.renderEditExtensions()}

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeEditRuleModal}>Close</button>
                        <button className="btn btn-success" onClick={::this.handleEditRule}>Edit</button>
                    </Modal.Footer>

                </Modal>
            </div>

        )
    }
}