import React,{Component} from 'react'
import AddFileType from 'AddFileType'
import EditFileType from 'EditFileType'
export default class FileTypesMangerPanel extends Component{
    constructor(){
        super()
        this.state = {
            name:'',
            father:'',
            showAddFileType:false,
            showEditFileType:false

        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.editedFileType){
            this.setState({
                showAddFileType:false,
                showEditFileType:true

            })

        }

    }
    showAddfileType(){
        this.setState({
            showAddFileType:true,
            showEditFileType:false

        })
    }
    render(){
        return(
            <div>
                <div className="row">
                    <button className="btn btn-success" onClick={::this.showAddfileType}> Add file type </button>
                </div>
                {
                    this.state.showAddFileType ?  <AddFileType fileTypeList={this.props.fileTypeList} /> :''
                }
                {
                this.state.showEditFileType ?  <EditFileType  editedFileType={this.props.editedFileType} fileTypeList={this.props.fileTypeList} typeFile={this.props.editedFileType}/>:''

                }


            </div>
        )
    }
}