import React, { Component } from 'react';
import{Accordion,Panel,Glyphicon }from'react-bootstrap';
import moment from 'moment'
export default class FileTypeListObject extends Component {
    constructor(){
        super();
        this.handleExpand = this.handleExpand.bind(this);
        this.state={
            hasChildren :false,
            expanded:false,
        }
    }
    componentWillMount(){
        let {row,sharedData} = this.props;
        let {fileTypeList} = sharedData;
        let children = fileTypeList.filter( object => {
            return  (object.father && object.father === row._id);
        });
         this.setState({
             hasChildren: children.length>0
         })
    }
    findChildren(){
        let {row,sharedData} = this.props;
        let {fileTypeList} = sharedData;

        let children = fileTypeList.filter( object => {
            return object.father === row._id;
        });

        if (children.length > 0 ){
            return children.map((row)=>{
                return <div className="list-group" key={row._id}>
                    <FileTypeListObject  handleSelectFileType ={this.props.handleSelectFileType}  row={row}  sharedData={sharedData}/>
                </div>
            })
        }

    }

    handleExpand(){
        let {expanded} = this.state;
        this.setState({expanded:!expanded});
    }
    render(){
        let {row} = this.props;
        let {hasChildren,expanded} = this.state;

        return(
            <Accordion>
                <Panel
                    header={
                       <div className="row" onClick={()=>{this.props.handleSelectFileType(row)}}>
                            <div className="col-lg-3">{row.name}</div>
                            <div className="col-lg-3">{row.rule ? row.rule.name : ''}</div>
                            <div className="col-lg-3">{moment.unix(row.createdAt).format("DD/MM/YYYY")}</div>
                            <div className="col-lg-3">{row.createdBy}</div>

                       </div>

                    }
                    eventKey={row.ID}>
                    {this.findChildren()}
                </Panel>
            </Accordion>

    )
    }

}