import React,{Component} from 'react'
import moment from 'moment'
import {getUserInfo} from 'storage'
import {patchFileTypes} from 'fileTypeAPI'
export default class AddFileType extends Component{
    constructor(){
        super()
        this.state= {
            fileTypeList:[],
            roles:[],
            name:'',
            createdAt:'',
            createdBy:'',
            father:'',
            id:0
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            fileTypeList: nextProps.fileTypeList,
            name:nextProps.editedFileType.name,
            father:nextProps.editedFileType.father ? nextProps.editedFileType.father :'' ,
            createdAt:nextProps.editedFileType.createdAt,
            createdBy:nextProps.editedFileType.createdBy,
            id:nextProps.editedFileType._id,
        });
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
        let{name,father,id} = this.state;
        if (name.length>0 ){
            if (father === '')
                father=null;

            let createObject={
                name,
                father,

            }
            patchFileTypes(id,createObject)
                .then((res)=>{
                    console.log(res)
                })
                .catch((e)=>{

                })


        }
    }

    render(){
        return(
            <div className="row">
                {this.state.father}
                <div className="add-filetype-form">
                    <div className="form-control">
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" onChange={::this.handleFormChange} value={this.state.name}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="father">father</label>
                        <select name="father"  value={this.state.father} onChange={::this.handleFormChange}>
                            <option value="" selected> none</option>
                            {this.props.fileTypeList.map(fileType =>
                                <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                            )};
                        </select>

                    </div>
                    <div className=" form-control">
                        <label htmlFor="createdBy"> created by</label>
                        <p>{this.state.createdBy}</p>
                    </div>
                    <div className=" form-control">
                        <label htmlFor="createdBy"> created At</label>
                        <p>{this.state.createdAt}</p>
                    </div>
                    <div className="form-control">
                        <button className="btn-success" onClick={::this.editFileType}>Edit</button>
                    </div>
                </div>


            </div>
        )
    }
}