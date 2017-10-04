import React,{Component} from 'react'
import {Glyphicon} from 'react-bootstrap'
import moment from 'moment'
export default class FileTypesMangerPanel extends Component{
    constructor(){
        super()

    }
    render(){
        return(
            <div>
                <div className="newco-form">

                    <div >
                        <label>Name:</label>
                        <div className="newco-info">
                            {this.props.selectedFileType.name}
                        </div>
                    </div>
                    <div >
                        <label>Father File Type:</label>
                        <div className="newco-info">
                            {this.props.selectedFileType.father? this.props.selectedFileType.father :'none'}
                        </div>
                    </div>
                    <div >
                        <label>Rule</label>
                        <div className="newco-info">
                            {this.props.selectedFileType.rule? this.props.selectedFileType.rule.name :'none'}
                        </div>
                    </div>
                    <div>
                        <label>Uploaded By:</label>
                        <div className="newco-info">
                            {this.props.selectedFileType.createdBy}
                        </div>
                    </div>

                    <div >
                        <label>Uploaded At:</label>
                        <div className="newco-info">
                            {moment.unix(this.props.selectedFileType.createdAt).format('DD/MM/YYYY hh:mm')}
                        </div>
                    </div>

                    <div className="button-group pull-right">
                        <a className="newco-button dark-yellow-background margin-top-15" onClick={()=>{this.props.openEditModal()}}>Edit</a>
                        <a className="newco-button light-red-background" onClick={()=>{this.props.openDeleteModal()}} >Delete</a>
                    </div>

                </div>
            </div>
        )
    }
}