import React, { Component } from 'react';
import{Accordion,Panel,Glyphicon }from'react-bootstrap';
export default class BrowsingRow extends Component {
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
        let {row,fileTypeList,files} = this.props;
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
        let {row,fileTypeList,files} = this.props;

        // pick the children of this row
        let children = fileTypeList.filter( object => {
            return object.father === row._id;
        });

        // if this row has children render them using this same component, until there is no children left under this row
        if (children.length > 0 ){

            return children.map((row)=>{
                return <div className="list-group" key={row._id}>
                    <BrowsingRow  handleDeleteFileType ={this.props.handleDeleteFileType} handleBrowseFile={this.props.handleBrowseFile} handleEditFileType={this.props.handleEditFileType} row={row}  files={files} fileTypeList={fileTypeList}/>
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
                    return <div className="list-group" key={row._id}>
                        {/*<BrowsingRow  handleDeleteFileType ={this.props.handleDeleteFileType} handleEditFileType={this.props.handleEditFileType} row={row}  fileTypeList={fileTypeList}/>*/}
                        <li className="list-group-item" onClick={()=>{this.props.handleBrowseFile(row)}}>
                            {row.title}
                            {row.uploadedBy}
                            {row.uploadedAt}

                        </li>
                    </div>
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
            <Accordion >
                <Panel
                    // i think the header is ugly and should be shortened in another component, but header property of Panel component didn't accept react components!!
                    header={
                       <div className="row" onClick={this.handleExpand}>


                               {/*{hasChildren ? <Glyphicon className={" pull-left expand-icon " + (expanded ? 'expanded':'')} glyph="menu-right"/> :<div className="empty-space">&nbsp;</div> }*/}
                           {/*<p>{hasChildren}</p>*/}
                           <p>{row.name}</p>


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