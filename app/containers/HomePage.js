import React, { Component } from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import BrowseFiles from 'BrowseFiles';
import FileTypesManager from 'FileTypesManager';
import RulesManager from 'RulesManager';
import {getAllFileTypes,availableFileTypes} from 'fileTypeAPI';
import {getAllRules} from 'rulesAPI';
import NotificationSystem from 'react-notification-system';
import {getUserInfo,removeUserInfo} from 'storage';

export default class HomePage extends Component{
    constructor(){
        super();
        this.state={

            sharedData : {
                fileTypeList : [],
                rulesList:[],
                refreshRulesAndFileTypes: ::this.refreshRulesAndFileTypes,
                notification: ::this.notification
            }
        };
        this._notificationSystem = null
    }
    logout(){
        removeUserInfo()
    }
    notification(message) {

        this._notificationSystem.addNotification({
            message: message.message,
            level: message.type,
            title:message.type,
            autoDismiss:3
        });
    }
    componentWillMount(){
        $('.tab-header').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
        this.refreshRulesAndFileTypes()

    }
    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }
    refreshRulesAndFileTypes(){
        getAllFileTypes()
            .then((res)=>{
                let{sharedData} = this.state
                this.setState({

                    sharedData:{
                        ...sharedData,
                        fileTypeList:res.data.fileType
                    },

                })
            })
            .catch((e)=>{

            })
        getAllRules()
            .then((res)=>{
                let{sharedData} = this.state

                this.setState({
                    sharedData:{
                        ...sharedData,
                        rulesList:res.data.rule
                    },

                })


            })
            .catch((e)=>{
                console.log(e)
            })
        getAllRules()
            .then((res)=>{
                let{sharedData} = this.state

                this.setState({
                    sharedData:{
                        ...sharedData,
                        rulesList:res.data.rule
                    },

                })


            })
            .catch((e)=>{
                console.log(e)
            })
        availableFileTypes()
            .then((res)=>{
                let{sharedData} = this.state
                console.log(res)
                this.setState({
                    sharedData:{
                        ...sharedData,
                        availableFileTypes:res.data.fileType
                    },

                })


            })
            .catch((e)=>{
                console.log(e)
            })
    }
    render(){
        return (
            <div className="home-page">
                <NotificationSystem ref="notificationSystem" />
                <Tabs defaultActiveKey={1} id="newco-tabs">
                    <Tab eventKey={1} title="Browse Files">
                        <BrowseFiles sharedData={this.state.sharedData} fileTypeList={this.state.fileTypeList}/>
                    </Tab>
                    <Tab eventKey={2} title="Manage File Types">
                        <FileTypesManager  sharedData={this.state.sharedData} fileTypeList={this.state.fileTypeList}/>
                    </Tab>
                    <Tab eventKey={3} title="Manage Rules">
                        <RulesManager sharedData={this.state.sharedData}/>
                    </Tab>
                </Tabs>
                <a href="/" className="logout" onClick={this.logout}>logout</a>
            </div>
        )
    }

}
