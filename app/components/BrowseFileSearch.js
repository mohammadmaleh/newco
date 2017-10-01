import React,{Component} from 'react'
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import {searchFiles} from 'filesAPI'
export default class BrowseFiles extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            startDate:'',
            endDate:'',
            description:'',
            tags:[],
            fileType:'',
            uploadedBy:'',
            fileTypeList: []
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fileTypeList)
            this.setState({fileTypeList: nextProps.fileTypeList});
    }

    handleStartDateChange(date){
        this.setState({
            startDate: date
        });
    }
    handleEndDateChange(date){
        this.setState({
            endDate: date
        });
    }

    handleChangeTags(tags) {
        this.setState({tags})
    }
    handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }
    handleSearch(){
        let {title,startDate,endDate,description,tags,fileType,uploadedBy} = this.state
        let searchObject = {
            title,
            startDate : startDate ? startDate.unix() : '',
            endDate : endDate ? endDate.unix() : '',
            description,
            tags,
            fileType,
            uploadedBy
        }
        searchFiles(searchObject)
            .then((res)=>{
                console.log(res)
                this.props.showBrowser(res.data);
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    render(){
        return(
            <div className="row browse-files-search">
                <div className="col-lg-2 ">
                    <label htmlFor="title" >title</label>
                    <input type="text" name="title"   onChange={::this.handleFormChange}/>
                </div>
                <div className="col-lg-2 ">
                    <label htmlFor="title">start date</label>
                     <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    tetherConstraints={ [] }
                />
                </div>
                <div className="col-lg-2 ">
                    <label htmlFor="title">end dat</label>
                     <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    tetherConstraints={ [] }
                />
                </div>
                <div className="col-lg-2 ">
                    <label htmlFor="title">tags</label>
                    <TagsInput value={this.state.tags} onChange={::this.handleChangeTags} />
                </div>
                <div className="col-lg-2 ">
                    <label htmlFor="title">file type</label>
                    <select name="fileType" onChange={::this.handleFormChange}>
                        <option value="" selected> Any</option>
                        {this.state.fileTypeList.map(fileType =>
                            <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                        )};
                    </select>
                </div>
                <div className="col-lg-2 " >
                    <label htmlFor="title">description</label>
                    <input type="text"  name="description" onChange={::this.handleFormChange}/>
                </div>
                <div className="col-lg-2 " >
                    <label htmlFor="title">uploaded by</label>
                    <input type="text"  name="uploadedBy" onChange={::this.handleFormChange}/>
                </div>
                <div className="col-lg-2 ">
                    <button className="btn btn-success" onClick={::this.handleSearch}> Search</button>
                </div>
            </div>
        )
    }

}