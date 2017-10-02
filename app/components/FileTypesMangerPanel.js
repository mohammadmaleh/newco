import React,{Component} from 'react'
import AddFileType from 'AddFileType'
import EditFileType from 'EditFileType'
export default class FileTypesMangerPanel extends Component{
    constructor(){
        super()

    }
    render(){
        return(
            <div>
                name:{this.props.selectedFileType.name}
                name:{this.props.selectedFileType.createdBy}
                name:{this.props.selectedFileType.createdAt}
                {/*{   this.props.selectedFileType.rule  ?*/}
                    {/*this.props.selectedFileType.rule.fileExtensions.map(rule=> {*/}
                    {/*return rule*/}
                    {/*})*/}
                {/*:''}*/}
                father:{this.props.selectedFileType.father}

                <button className="btn btn-info" onClick={()=>{this.props.openEditModal()}}>Edit</button>
                <button className="btn btn-info" onClick={()=>{this.props.openDeleteModal()}}>Delete</button>
            </div>
        )
    }
}