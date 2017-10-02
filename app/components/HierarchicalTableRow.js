import React, { Component } from 'react';
import{Accordion,Panel,Glyphicon }from'react-bootstrap';
export default class HierarchicalTableRow extends Component {
    constructor(){
        super();
        // this.removeRow = this.removeRow.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.state={
            hasChildren :false,
            expanded:false,
        }
    }
    // here im checking if the row has children to render the collapse icon, I think there should be a better way to do it than this way, but im short in time
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
    // function to find this row's children, then render each children using the same component, nodes of the children are unlimited
    findChildren(){
        let {row,sharedData} = this.props;
        let {fileTypeList} = sharedData;

        // pick the children of this row
        let children = fileTypeList.filter( object => {
            return object.father === row._id;
        });

        // if this row has children render them using this same component, until there is no children left under this row
        if (children.length > 0 ){
            return children.map((row)=>{
                return <div className="list-group" key={row._id}>
                    <HierarchicalTableRow  handleSelectFileType ={this.props.handleSelectFileType}  row={row}  sharedData={sharedData}/>
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

    render(){
        let {row} = this.props;
        let {hasChildren,expanded} = this.state;

        return(
            <Accordion>
                <Panel
                    // i think the header is ugly and should be shortened in another component, but header property of Panel component didn't accept react components!!
                    header={
                       <div className="row" onClick={()=>{this.props.handleSelectFileType(row)}}>


                               {hasChildren ? <Glyphicon className={" pull-left expand-icon " + (expanded ? 'expanded':'')} glyph="menu-right"/> :<div className="empty-space">&nbsp;</div> }
                           <p>{row.name}</p>


                           <a className="col-lg-3 col-md-3 col-sm-3 col-xs-3">{row.createdBy}</a>
                           <a className="col-lg-3 col-md-3 col-sm-5 col-xs-5">{row.createdAt}</a>

                       </div>

                    }
                    eventKey={row.ID}>
                    {this.findChildren()}
                </Panel>
            </Accordion>

    )


    }

}