import React, { Component } from 'react';
import{Accordion,Panel,Glyphicon }from'react-bootstrap';
import moment from 'moment'
export default class FileListObject extends Component {
    constructor(){
        super();
        // this.removeRow = this.removeRow.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.state={
            hasFilesChildren :false,
            hasFileTypeChildren :false,
            expanded:false,
            files:[]
        }
    }
    // here im checking if the row has children to render the collapse icon, I think there should be a better way to do it than this way, but im short in time
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
    // function to find this row's children, then render each children using the same component, nodes of the children are unlimited
    findChildren(){
        let {row,sharedData,files} = this.props;
        let {fileTypeList} = sharedData

        // pick the children of this row
        let children = fileTypeList.filter( object => {
            return object.father === row._id;
        });

        // if this row has children render them using this same component, until there is no children left under this row
        if (children.length > 0 ){

            return children.map((row)=>{
                return <div className="list-group" key={row._id}>
                    <FileListObject  handleDeleteFileType ={this.props.handleDeleteFileType} handleBrowseFile={this.props.handleBrowseFile} handleEditFileType={this.props.handleEditFileType} row={row}  files={files} sharedData={this.props.sharedData}/>
                </div>
            })
        }

    }
    // removeRow(){
    //     let {row} = this.props;
    //     this.props.removeRow(row.ID)
    // }
    handleExpand(){
        let {expanded} = this.state;
        this.setState({expanded:!expanded});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files});
    }

    findFiles(){
        let {row,files} = this.props;
        // pick the children of this row

        if(files){
            let childrenFiles = files.file.filter( object => {
                return ( object.fileType && object.fileType._id === row._id);
            });

            // // if this row has children render them using this same component, until there is no children left under this row
            if (childrenFiles.length > 0 ){

                return childrenFiles.map((row)=>{
                    return <ul className="list-group" key={row._id}>
                        {/*<FileListObject  handleDeleteFileType ={this.props.handleDeleteFileType} handleEditFileType={this.props.handleEditFileType} row={row}  fileTypeList={fileTypeList}/>*/}
                        <li className="list-group-item" onClick={()=>{this.props.handleBrowseFile(row)}}>
                            <div className="row">
                                <div className="col-lg-3"> {row.title}</div>
                                <div className="col-lg-3"> {moment.unix(row.uploadedAt).format('DD/MM/YYYY')}</div>
                                <div className="col-lg-3"> {row.uploadedBy}</div>
                            </div>

                        </li>
                    </ul>
                })
            }
        }





    }
    editRow(e){
        e.stopPropagation()
        let {row} = this.props;

        this.props.handleEditFileType(row);
    }

    deleteRow(e){
        e.stopPropagation()
        let {row} = this.props;

        this.props.handleDeleteFileType(row);
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

                    {this.findFiles()}

                    {this.findChildren()}
                </Panel>
            </Accordion>

    )


    }

}