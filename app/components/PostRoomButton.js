import React,{Component} from 'react'
import {Link} from 'react-router-dom'
export default  class PostRoomButton extends Component{
  constructor(props){
      super(props);
  }
  render(){
      return <div className="post-room-button">

              <Link to='/post-room'>
                  <a  className="btn btn-ghost"  href="#"  >Post a room</a>

              </Link>




      </div>
  }
}
