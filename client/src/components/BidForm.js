import React, {Component} from 'react';
import { connect } from 'react-redux';
import {saveBidOfUser} from '../actions';

const mapDispatchToProps = (dispatch) => {

    let actions = {saveBidOfUser};
    return { ...actions, dispatch };

  }

const mapStateToProps = (state) => {
    return {
      projectBidStatus: state.postProjectReducer.projectBidStatus
    }
}


class BidForm extends Component{
  static defaultProps = {
    projectBidStatus :false
  }


  constructor(props){
    super(props);
    this.state = {
       bid_price: "",
       bid_days: "",
       hourlyRateError : false,
       hourlyRateErrorMsg :"",
       user_id : localStorage.getItem("userid"),
       project_id : this.props.projectID

     }
    this.handleSubmitBid = this.handleSubmitBid.bind(this);
    this.handleHourlyRateChange = this.handleHourlyRateChange.bind(this);
    this.handleBidPeriodChange = this.handleBidPeriodChange.bind(this);
  }

  handleSubmitBid(){
    this.props.dispatch(this.props.saveBidOfUser(this.state));

  }
  handleBidPeriodChange(event){
    let elementValue = event.target.value;
    if(elementValue == ''){
       this.setState({bidPeriodError :true, bidPeriodErrorMsg: "Please enter a Bid period"});
    }else{
        var emailPattern = /^[0-9]/;
        if(!emailPattern.test(elementValue)){
           this.setState({bidPeriodError :true, bidPeriodErrorMsg: "Hourly rate must be in numbers"});
        }
        else{
          this.setState({bidPeriodError :false, bidPeriodErrorMsg:"",bid_days: elementValue}, function () {
            console.log("Bid period checked");
          });
        }
      }

  }

  handleHourlyRateChange(event){
    let elementValue = event.target.value;
    if(elementValue == ''){
       this.setState({hourlyRateError :true, hourlyRateErrorMsg: "Please enter a hourly rate"});
    }else{
        var emailPattern = /^[0-9]/;
        if(!emailPattern.test(elementValue)){
           this.setState({hourlyRateError :true, hourlyRateErrorMsg: "Hourly rate must be in numbers"});
        }
        else{
          this.setState({hourlyRateError :false, hourlyRateErrorMsg:"",bid_price: elementValue}, function () {
            console.log("hourly rate checked");
          });
        }
      }

  }

  render(){
    return(
        <div className = "bidform">
        <div id="frm_place_bid" class="fl-form" novalidate="novalidate">
                <legend class="BidProposal-title">Bid Proposal</legend>
                <input type="hidden" name="id" value="16491277"/>
                <div id="error-messages" class="error hide message alert alert-error"></div>
                <div id="membership-low-bids-alert"></div>
                <div id="bid-stats" class="BidProposal-stats">
                    <fieldset class="BidProposal-row BidProposal-fieldset">
                        <div class="form-group col-md-2">

                                <label for="hourlyrate">Hourly Rate $(USD)</label>
                                <div class="control-group">
                                    <span class="input-group">

                                        <input class="form-control BidProposal-form-input earnedSum" name="sum" type="text" onBlur ={this.handleHourlyRateChange}/>
                                        <input class="form-control sum actualBidAmount" type="hidden" name="sum" value="22.22"/>
                                    </span>
                                    <span class="small help-inline"></span>
                                </div>
                                </div>
                                <div class="form-group col-md-2">
                                <label for="weeklylimit">Bid Period (in Days)</label>
                                <div class="control-group">
                                    <span class="input-group">
                                        <input class="form-control BidProposal-form-input period" name="period" type="text"  onBlur ={this.handleBidPeriodChange}/>
                                    </span>
                                    <span class="small help-inline"></span>
                                </div>
                                </div>
                                <br />
                                <div className="col-md-2" ><button  class="btn btn-primary " onClick={this.handleSubmitBid}>Submit</button></div>

                    </fieldset>
                </div>

                {this.props.projectBidStatus ?
                <div id="proposal-panel">
                  <div class="BidProposal-alert alert alert-success">
                          <strong>Your bid was placed successfully!</strong>
                    </div>
                </div> : null }
            </div>
        </div>
      );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BidForm);
