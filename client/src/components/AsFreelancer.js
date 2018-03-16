import React, {Component} from 'react';
import DashBoardSwitch from './DashBoardSwitch';
import { connect } from 'react-redux';
import {getAllBiddedProject} from '../actions'

const mapDispatchToProps = (dispatch) => {

    let actions = {getAllBiddedProject};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {
      projectsBiddedByMe: state.userReducer.projectsBiddedByMe
    };
  }

class AsFreelancer extends Component{

  constructor(props){
    super(props);
    // this.state = {
    //   isFreelancer : true,
    //   freelancerText : 'Freelancer',
    //   employerText : 'Employer'
    // }
  }

  componentDidMount(){
    this.props.dispatch(this.props.getAllBiddedProject(localStorage.getItem("userid")))
  }


    render(){
      return(
        <div>
            <DashBoardSwitch />
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Employer</th>
                  <th>Avg Bid</th>
                  <th>Your Bid</th>
                  <th>Status of  Project</th>
                </tr>
              </thead>
              <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
        </div>
      );
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(AsFreelancer);
