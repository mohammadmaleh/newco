import React,{Component} from 'react'
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import {searchFiles} from 'filesAPI'
import moment from 'moment';
export default class BrowseFiles extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            startDate:moment().add(-1, 'days'),
            endDate:moment(),
            description:'',
            tags:[],
            fileType:'',
            uploadedBy:'',
        }

        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
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
            <div className=" container browse-files-search light-grey-background">
                <div className="row">
                    <div className="newco-form">
                        <div className="col-lg-2 ">
                            <label htmlFor="title" >Title:</label>
                            <input type="text" name="title" className="newco-text-input"   onChange={::this.handleFormChange}/>
                        </div>
                        <div className="col-lg-2 ">
                            <label htmlFor="title">Start Date:</label>
                            <DatePicker
                                className="newco-text-input"
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                dateFormat="DD/MM/YYYY"
                                tetherConstraints={ [] }
                            />
                        </div>
                        <div className="col-lg-2 ">
                            <label htmlFor="title">End Date</label>
                            <DatePicker
                                dateFormat="DD/MM/YYYY"

                                className="newco-text-input"
                                selected={this.state.endDate}
                                tetherConstraints={ [] }
                            />
                        </div>
                        <div className="col-lg-2 ">
                            <label htmlFor="title">File Type:</label>
                            <select className="newco-text-input" name="fileType" onChange={::this.handleFormChange}>
                                <option value="" selected> Any</option>
                                {this.props.sharedData.fileTypeList.map(fileType =>
                                    <option key={fileType._id} value={fileType._id}>{fileType.name}</option>
                                )};
                            </select>
                        </div>
                        <div className="col-lg-2 " >
                            <label htmlFor="title">Uploaded By</label>
                            <input type="text" className="newco-text-input" name="uploadedBy" onChange={::this.handleFormChange}/>
                        </div>

                    </div>




                </div>
                <div className="row margin-top-15 ">
                    <div className="newco-form">
                        <div className="col-lg-4 ">
                            <label htmlFor="title">Tags:</label>
                            <TagsInput className="newco-text-input tags-search" value={this.state.tags} onChange={::this.handleChangeTags} />
                        </div>
                        <div className="col-lg-4 " >
                            <label htmlFor="title">Description:</label>
                            <input type="text"  className="description-search newco-text-input" name="description" onChange={::this.handleFormChange}/>
                        </div>
                        <div className="col-lg-2  ">
                            <a className=" newco-button light-green-background search-button  margin-top-15" onClick={::this.handleSearch}> Search</a>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}