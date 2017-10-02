/**
 * Created by mohammadmaleh on 01/10/2017.
 */
/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
import moment from 'moment'
export default class RulesBrowser extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ul className="rule-list list-group">
                <li className=" header normal-blue-background">
                    <div className="col-lg-4"> Rule Name</div>
                    <div className="col-lg-4">Created At</div>
                    <div className="col-lg-4">Created By</div>
                </li>
                {this.props.sharedData.rulesList.map(rule=>{
                    return <li className=""  onClick={()=>{this.props.handleSelectRule(rule)}} key={rule._id}>
                        <div className="row" >
                            <div className="col-lg-4">{rule.name}</div>
                            <div className="col-lg-4">{moment.unix(rule.createdAt).format('DD/MM/YYYY')}</div>
                            <div className="col-lg-4">{rule.createdBy}</div>
                        </div>
                    </li>
                })}
            </ul>
        )
    }
}