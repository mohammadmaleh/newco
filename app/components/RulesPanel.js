/**
 * Created by mohammadmaleh on 01/10/2017.
 */
/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
export default class RulesPanel extends Component{
    constructor(){
        super()
    }
    renderExtensions(){
        let {fileExtensions} = this.props.selectedRule
        let extesionsHtml = [];
        for (var key in fileExtensions) {
            if (fileExtensions.hasOwnProperty(key) && fileExtensions[key] ) {
                extesionsHtml.push(
                    <div className="form-control" key={key}>
                        {key}
                    </div>
                )
            }
        }
        return extesionsHtml.map(ext=>{
            return ext
        })

    }
    render(){
        let {selectedRule} = this.props
        return(
            <div>
                <div className="form-control">
                    name:{selectedRule.name}
                </div>
                <div className="form-control">
                    size :{selectedRule.maxSize}
                </div>
                {this.renderExtensions()}
                <button className="btn btn-info" onClick={()=>{this.props.showEditRuleModal()}}>Edit</button>
                <button className="btn btn-danger" onClick={()=>{this.props.showDeleteRuleModal()}}>Delete</button>
            </div>
        )
    }
}