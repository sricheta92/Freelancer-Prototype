import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Typeahead} from 'react-bootstrap-typeahead';
import { getAllSkills } from '../actions';


const mapDispatchToProps = (dispatch)=>{
    let actions = {getAllSkills};
    return { ...actions, dispatch };
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user,
        skill : state.userReducer.skill
    }
}


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabletags: {
              firstname: true,
              lastname: true,
              email: true,
              aboutme: true,
              phonenumber: true,
              skilltag: true,
              updatebutton : false
            },

            userdetails: {
                userId : 1,
                firstname: '',
                lastname: '',
                email: '',
                aboutme: '',
                phonenumber: ''
            },

        };

        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.editprofile = this.editprofile.bind(this);
        this.updateuserProfile = this.updateuserProfile.bind(this);

    };

    static defaultProps ={
      user :[

      ],
      skill :[

      ]
    }
    handleOptionSelected(option){
        //.setState({userskills : option});
        //console.log(option);
    }

    editprofile(option){
        this.setState({
            disabletags: {
                ...this.state.disabletags,
                firstname: false,
                lastname: false,
                email:false,
                aboutme: false,
                phonenumber: false,
                updatebutton: true
            }
        });
    }


    updateuserProfile(option){
        this.props.dispatch(this.props.setProfile(this.state.userdetails));
    }

    componentDidMount(){
      console.log("componentWillMount");
      this.props.dispatch(getAllSkills());
    }


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className= "text-left float-left"><h3>User Details</h3></div>
                    <div><button className="btn btn-primary float-right" onClick={this.editprofile}>Edit Profile</button></div>
                </div>
                <div className="container-fluid panel panel-default border text-left">
                    <div className="row ">
                        <div className="col-sm-2 font-weight-bold">First Name:</div><input type="text" className="col-sm-4"  value={this.props.user[0].firstname} disabled = {this.state.disabletags.firstname}
                                                                                           onChange={(event) => {
                                                                                               this.setState({
                                                                                                   userdetails: {
                                                                                                       ...this.state.userdetails,
                                                                                                       firstname: event.target.value
                                                                                                   }
                                                                                               });
                                                                                           }}></input>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2 font-weight-bold">Last Name:</div><input type="text" className="col-sm-4"  value={this.props.user[0].lastname} disabled = {this.state.disabletags.lastname}
                                                                                          onChange={(event) => {
                                                                                              this.setState({
                                                                                                  userdetails: {
                                                                                                      ...this.state.userdetails,
                                                                                                      lastname: event.target.value
                                                                                                  }
                                                                                              });
                                                                                          }}></input>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2 font-weight-bold">Email Name:</div><input type="text" className="col-sm-4"  value={this.state.user[0].email} disabled = {this.state.disabletags.email}
                                                                                           onChange={(event) => {
                                                                                               this.setState({
                                                                                                   userdetails: {
                                                                                                       ...this.state.userdetails,
                                                                                                       email: event.target.value
                                                                                                   }
                                                                                               });
                                                                                           }}></input>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2 font-weight-bold">About Me:</div><input type="text" className="col-sm-4"  value={this.state.user[0].prof_headline} disabled = {this.state.disabletags.aboutme}
                                                                                         onChange={(event) => {
                                                                                             this.setState({
                                                                                                 userdetails: {
                                                                                                     ...this.state.userdetails,
                                                                                                     aboutme: event.target.value
                                                                                                 }
                                                                                             });
                                                                                         }}></input>
                    </div>
                    <div className="row ">
                        <div className="col-sm-2 font-weight-bold">Phone number:</div><input type="text" className="col-sm-4"  value={this.state.user[0].phone} disabled = {this.state.disabletags.phonenumber}
                                                                                             onChange={(event) => {
                                                                                                 this.setState({
                                                                                                     userdetails: {
                                                                                                         ...this.state.userdetails,
                                                                                                         phonenumber: event.target.value
                                                                                                     }
                                                                                                 });
                                                                                             }}></input>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 font-weight-bold">Skills:</div>
                        <Typeahead
                            multiple
                            labelKey="name"
                            selected = {this.props.skill}
                            options={this.props.skills}
                            placeholder="What Skills are required? "
                            onChange={this.handleOptionSelected}
                        />
                    </div>
                    <div className="col-sm-2 font-weight-bold">
                        <div className="row">
                        { this.state.disabletags.updatebutton ? <button className="btn btn-primary" onClick={this.updateuserProfile}>Update</button> : null }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(UserProfile));
