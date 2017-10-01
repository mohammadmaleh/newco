/**
 * Created by mohammadmaleh on 29/05/2017.
 */
var React = require('react');
var {connect} =   require('react-redux');
import{logoutUser} from 'actions'
var SignOutButton = React.createClass({
    handleSignOut:function(e){
        e.preventDefault();
        let {dispatch} =  this.props;

        dispatch(logoutUser())
    }

    ,
    render: function () {


        return (
            <div className="sign-in-button float-right">
                <a  className="btn btn-ghost"  href="#"  onClick={this.handleSignOut}>Sign out</a>


            </div>

        )
    }
});
export default connect(
    (state) => {
        return state;
    }
)(SignOutButton);;
