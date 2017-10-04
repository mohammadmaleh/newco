/**
 * Created by mohammadmaleh on 01/10/2017.
 */
/**
 * Created by mohammadmaleh on 01/10/2017.
 */
import React,{Component} from 'react'
import {Glyphicon} from 'react-bootstrap'
 import moment from 'moment'
export default class RulesPanel extends Component{
    constructor(){
        super()
    }
    render(){
        let {selectedRule} = this.props
        console.log(selectedRule)

        return(
        <div>
            <div className="newco-form">

                <div >
                    <label>Name:</label>
                    <div className="newco-info">
                        {selectedRule.name}
                    </div>
                </div>
                <div >
                    <label>Max Size:</label>
                    <div className="newco-info">
                        {selectedRule.maxSize}
                    </div>
                </div>
                { (selectedRule  && selectedRule.fileExtensions)?

                    <div className="">
                        <label>Allowed Extensions:</label>

                        <div className="row extension-info">
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.images ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                Images
                            </div>
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.word ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                Word
                            </div>
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.excel ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                Excel
                            </div>
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.pdf ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                PDF
                            </div>
                        </div>
                        <div className="row newco-info extension-info ">
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.mp3 ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                MP3
                            </div>
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.mp4 ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                MP4
                            </div>
                            <div className="col-lg-3">
                                {selectedRule.fileExtensions.fonts ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                Fonts
                            </div>
                            <div className="col-lg-3 ">
                                {selectedRule.fileExtensions.zip ? <Glyphicon  glyph="ok"/> : <Glyphicon glyph="remove"/> }
                                Zip
                            </div>
                        </div>
                    </div>

                    :''

                }

                <div>
                    <label>Uploaded By:</label>
                    <div className="newco-info">
                        {selectedRule.createdBy}
                    </div>
                </div>
                <div >
                    <label>Uploaded At:</label>
                    <div className="newco-info">
                        {moment.unix(selectedRule.createdAt).format('DD/MM/YYYY hh:mm')}
                    </div>
                </div>

                <div className="button-group pull-right">
                    <a className="newco-button dark-yellow-background margin-top-15" onClick={()=>{this.props.showEditRuleModal()}}>Edit</a>
                    <a className="newco-button light-red-background" onClick={()=>{this.props.showDeleteRuleModal()}} >Delete</a>
                </div>

            </div>
        </div>

        )
    }
}