import React, { Component } from 'react';
import {Tab,Tabs} from 'react-bootstrap'
import BrowseFiles from 'BrowseFiles'
import FileTypesManager from 'FileTypesManager'
import RulesManager from 'RulesManager'

import Header from 'Header'
import {getAllFileTypes} from 'fileTypeAPI'

export default class HomePage extends Component{
    constructor(){
        super()
        this.state={
            fileTypeList:[]
        }
    }

    componentWillMount(e){
        $('.tab-header').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
        getAllFileTypes()
            .then((res)=>{
                console.log(res)
                this.setState({
                    fileTypeList:res.data.fileType
                })
            })
            .catch((e)=>{

            })

    }


    render(){
        return (
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Browse Files">
                        <BrowseFiles fileTypeList={this.state.fileTypeList}/>
                    </Tab>
                    <Tab eventKey={2} title="Manage File Types">
                        <FileTypesManager fileTypeList={this.state.fileTypeList}/>
                    </Tab>
                    <Tab eventKey={3} title="Manage Rules">
                        <RulesManager/>
                    </Tab>
                </Tabs>

            </div>
        )
    }

}