import React, { Component } from 'react';
import{Accordion,Panel,Glyphicon }from'react-bootstrap';
import moment from 'moment'
export default class FileListObject extends Component {
    constructor(){
        super();
        this.handleExpand = this.handleExpand.bind(this);
        this.state={
            hasFilesChildren :false,
            hasFileTypeChildren :false,
            expanded:false,
            files:[]
        }
    }
    componentWillMount(){

        let {row,sharedData,files} = this.props;
        let {fileTypeList} = sharedData
        let children = fileTypeList.filter( object => {
            return  (object.father && object.father === row._id);
        });
        let childrenFiles = files.file.filter( object => {
            return ( object.fileType && object.fileType._id === row._id);
        });

        this.setState({
            hasFilesChildren:   childrenFiles.length>0,
            hasFileTypeChildren:children.length>0
         })
    }
    handleDownload(){

    }
    findChildren(){
        let {row,sharedData,files} = this.props;
        let {fileTypeList} = sharedData

        let children = fileTypeList.filter( object => {
            return object.father === row._id;
        });

        if (children.length > 0 ){

            return children.map((row)=>{
                return <div className="list-group" key={row._id}>
                    <FileListObject  handleDeleteFileType ={this.props.handleDeleteFileType} handleBrowseFile={this.props.handleBrowseFile} handleEditFileType={this.props.handleEditFileType} row={row}  files={files} sharedData={this.props.sharedData}/>
                </div>
            })
        }

    }

    handleExpand(){
        let {expanded} = this.state;
        this.setState({expanded:!expanded});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files});
    }

    findFiles(){
        let {row,files} = this.props;

        if(files){
            let childrenFiles = files.file.filter( object => {
                return ( object.fileType && object.fileType._id === row._id);
            });

            if (childrenFiles.length > 0 ){

                return childrenFiles.map((row)=>{
                    return <li className="list-group-item" key={row._id} onClick={()=>{this.props.handleBrowseFile(row)}}>
                            <div className="row">
                                <div className="col-lg-3 short-text" > {row.title}</div>
                                <div className="col-lg-3"> {moment.unix(row.uploadedAt).format('DD/MM/YYYY')}</div>
                                <div className="col-lg-3"> {row.uploadedBy}</div>
                                <div className="col-lg-3" onClick={::this.handleDownload}> download</div>
                            </div>

                        </li>
                })
            }
        }





    }
    render(){
        let {row} = this.props;
        let {hasFileTypeChildren,hasFilesChildren,expanded} = this.state;
        return(
            <Accordion bsClass="file-type-object" >
                <Panel
                    header={
                       <div className="row" onClick={this.handleExpand}>
                           <div className="col-lg-3">File Type : {row.name}</div>



                       </div>

                    }
                    eventKey={row.ID}>

                    <div className=" rule-list list-group" >
                        <li className="list-group-item  normal-blue-background browse-file-header" >
                            <div className="">
                                <div className="col-lg-3 short-text" > Title</div>
                                <div className="col-lg-3"> Uploaded At</div>
                                <div className="col-lg-3"> Uploaded By</div>
                                <div className="col-lg-3" onClick={::this.handleDownload}> download</div>
                            </div>

                        </li>

                        {this.findFiles()}
                    </div>

                    {this.findChildren()}
                </Panel>
            </Accordion>

    )


    }

}