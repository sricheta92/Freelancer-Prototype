import React,{Component} from 'react';
import { connect } from 'react-redux';
import {completeProfile,mapSkillToUser} from '../actions';
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => {

    let actions = {completeProfile,mapSkillToUser};
    return { ...actions, dispatch };
}

const mapStateToProps = (state) => {

  return {
      skills: state.skillReducer.skills,
      userID :state.signupReducer.userID

    };
}


class ProfileStep2 extends Component{

  constructor(props){
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(event) {
    event.preventDefault();
    this.setState({
      fname : this.refs.fname.value,
      lname : this.refs.lname.value,
      city :this.refs.city.value,
      phone :this.refs.phone.value,
      skills : this.props.skills,
      userID : this.props.userID
    },function(){
        this.props.dispatch(completeProfile(this.state))
        .then(() => this.props.dispatch(mapSkillToUser(this.state)))
        .then(  this.props.history.push("/login"));
    });
  }
/*
  componentWillReceiveProps(){
    if(this.props.userID){
      this.props.history.push("/login");
    }
  } */

  render(){
    return(
      <div className = "profile-step2">
        <div className= "CompleteProfile col-md-4 col-lg-4 col-sm-4">
            <div className="CompleteProfile-header">
                <div className="CompleteProfile-header-title" >Complete Your Profile</div>
                <div className="CompleteProfile-header-subtitle">
                    Fill in your profile for employers to better understand your services when they visit your profile page.
                </div>
                <div className="CompleteProfile-header-subtitle" >
                    It is important to leave accurate information here to maximize your chances of getting jobs.
                </div>

                </div>

          </div>
          <div className= "col-md-8 col-lg-8 col-sm-8">
            <form ole="form" method="POST" onSubmit = {this.handleComplete}>
              <div class="CompleteProfile-form">
                  <div class="form-group CompleteProfile-form-row">
                      <span class="CompleteProfile-form-header">Full Name</span>
                      <span class="CompleteProfile-form-input">
                          <input class="CompleteProfile-form-input-left large-input " ref= "fname" type="text" placeholder="First Name" required/>
                          <input class="CompleteProfile-form-input-right large-input " ref= "lname" type="text" placeholder="Last Name" required/>
                      </span>

                  </div>
                  <div class="form-group CompleteProfile-form-row gap">
                      <span class="CompleteProfile-form-header">Contact Information</span>
                      <span class="CompleteProfile-form-input">
                          <input class="CompleteProfile-form-input-left large-input " type="text"  ref= "phone" pattern="^\d{3}-\d{3}-\d{4}$"  placeholder="Phone Number (format: xxx-xxx-xxxx)" required />
                          <input class="CompleteProfile-form-input-right large-input " type="text" ref="city" placeholder="City" required/>
                      </span>

                  </div>
                  <div className="form-group wizard-finish-btn pull-right">
                      <div >
                        <button id="complete-profile" type="submit" className="btn btn-info btn-large btn-submit large-input freelancer-font">
                          Create my profile and go to login page
                         </button>
                      </div>
                  </div>

              </div>
            </form>
          </div>

      </div>
    );
  }

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProfileStep2));
