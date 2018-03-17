import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      user : state.userReducer.user
    };
  }

class UserProfile extends Component{

  static defaultProps = {
    user :[

    ],
    skill :[]
  }

  render(){
    return(
      <div>
        <center>
          <img src="" name="aboutme" width="140" height="140" border="0" class="img-circle"/>
          <h3 class="media-heading">{this.props.user[0].username}<small>{this.props.user[0].city}</small></h3>
              <span><strong>Skills: </strong></span>
              {this.props.skill.map(skill => <span class="label label-warning">skill_name</span>)}

        </center>
        <hr/>
        <center>
            <p class="text-left">
              <strong>Bio:</strong>
              <br/>
                {this.props.user[0].bio} </p>

        </center>
      </div>
    );
  }


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
