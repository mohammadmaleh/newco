/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import RulesBrowser from 'RulesBrowser'
import RulesPanel from 'RulesPanel'
import {postRule,patchRule,deleteRule} from 'rulesAPI'
export default class RulesManager extends Component{
    constructor(){
        super()
        this.state = {
            showAddRuleModal:false,
            showDeleteRuleModal:false,
            showEditRuleModal:false,
            selectedRule:{},
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

    handleAddExtensionsChange(event){
        const target = event.target;
        const value = target.checked ;
        const name = target.name;
        let state = this.state
        let {addRuleForm} =  state
        let {fileExtensions} = addRuleForm

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
    renderAddExtensions(){
        let {fileExtensions} = this.state.addRuleForm
        let extentionsHtml = []


        for (var key in fileExtensions) {
            if (fileExtensions.hasOwnProperty(key)) {
                extentionsHtml.push(
                    <div className="form-control">
                        {key}
                        <input type="checkbox" checked={this.state.addRuleForm.fileExtensions[key]} name={key} key={key} onChange={::this.handleAddExtensionsChange}/>
                    </div>
                )
            }
        }
        return extentionsHtml.map(ext=>{
            return <div key={ext}>ext</div>
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
            showAddRuleModal:true
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
        postRule(addRuleForm)
            .then(res =>{
                this.props.sharedData.refreshRulesAndFileTypes()
            })
            .catch(e => {
                console.log(e)
            })
    }
    handleDeleteRule(){
        let {selectedRule} = this.state;
        deleteRule(selectedRule._id)
            .then(res =>{
                 console.log(res)
                this.props.sharedData.refreshRulesAndFileTypes()

            })
            .catch(e =>{
                console.log(e)
            })
    }
    handleEditRule(){
        let {editRuleForm,selectedRule} =  this.state;
        let id = selectedRule._id;
        patchRule(id,editRuleForm)
            .then(res =>{
                this.props.sharedData.refreshRulesAndFileTypes()

            })
            .catch(e =>{
                console.log(e)
            })
    }
    render(){
        let {addRuleForm,editRuleForm,selectedRule}= this.state

        return(
            <div>
                <div className="row">
                    <button className="btn btn-success" onClick={::this.showAddRuleModal}>add new Rule</button>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <RulesBrowser sharedData={this.props.sharedData} handleSelectRule={::this.handleSelectRule}/>
                    </div>
                    <div className="col-lg-6">
                        <RulesPanel showEditRuleModal={::this.showEditRuleModal} showDeleteRuleModal={::this.showDeleteRuleModal}   selectedRule={selectedRule}/>
                    </div>
                </div>


                <Modal show={this.state.showAddRuleModal}  onHide={::this.closeAddRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-control">
                            name <input type="text" name='name' value={addRuleForm.name} onChange={::this.handleAddRuleFormChange}/>

                        </div>
                        <div className="form-control">
                            size <input type="text" value={addRuleForm.maxSize} name="maxSize" onChange={::this.handleAddRuleFormChange}/>
                        </div>
                        {this.renderAddExtensions()}

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeAddRuleModal}>Close</button>
                        <button className="btn btn-success" onClick={::this.handleSubmitRule}>Add</button>
                    </Modal.Footer>

                </Modal>



                <Modal show={this.state.showDeleteRuleModal}  onHide={::this.closeDeleteRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        are you sure you want to delete {selectedRule.name} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={::this.closeDeleteRuleModal}>Close</button>
                        <button className="btn btn-danger" onClick={::this.handleDeleteRule}>Delete</button>
                    </Modal.Footer>

                </Modal>
                <Modal show={this.state.showEditRuleModal}  onHide={::this.closeEditRuleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>edit</Modal.Title>
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