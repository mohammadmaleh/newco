/**
 * Created by mohammadmaleh on 01/10/2017.
 */
/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Modal} from 'react-bootstrap'
export default class RulesBrowser extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                {this.props.allRules.map(rule=>{
                    return <li onClick={()=>{this.props.handleSelectRule(rule)}} key={rule._id}>{rule.name}</li>
                })}
            </div>
        )
    }
}