import React, {Component} from 'react';
import { connect } from 'react-redux';
import FixedNav from './FixedNav';
import BidForm from './BidForm';
import UserBidList from './UserBidList';


const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

  }

const mapStateToProps = (state) => {
    return {
      project: state.postProjectReducer.project
    }
}


class ProjectDetails extends Component{

  constructor(props){
    super(props);
    this.state={
      showComponent : false,
      averageBid : 0
    };
    this.toggleBidForm = this.toggleBidForm.bind(this);
  }

  static defaultProps = {
     project: {
       project :{
                   projectname :'',
                 },
       skills :[{
         name :''
       }],
       usersBidded : [],
       file :''

     }
  }

toggleBidForm(){
   this.setState(function(prevState) {
     return {showComponent: !prevState.showComponent};
   });
}

componentWillMount(){
   let data = this.props.project.usersBidded;
   var sum = 0;
   let bidAverage;
   data.forEach(function(user){
     sum = sum + user.bid_price;
   });
   bidAverage = sum/data.length;
   this.setState({averageBid : bidAverage});
}
render(){
  return(
    <div>
      <FixedNav />
      <div className = "gaf-container" >
      <div id="projectHeader">
                <div class="project-header-controls span8">
                    <h1 class="project_name largest bold margin-b5 span12">{this.props.project.project.project_name}</h1>
                    <div class="span12 margin-0"></div>
                </div>
              <div class="clear"></div>
        </div>
        <div class="row col-md-12 well well2 white silver span padding-5 align-c margin-t10 margin-l10 margin-b10 PageFreelancerPvp-infoBar-details">
          <div  class="align-c padding-r10 padding-l5 project-view-status">
              <div>
                  <span className = "col-md-3">
                    <span>Bids</span>
                    <span id="num-bids" class="text-blue larger bold">{this.props.project.usersBidded.length}</span>
                  </span>
                  <span  class="col-md-3 align-c padding-l10 padding-r10 border-r border-l project-view-status">
                      <span>Avg Bid (USD)</span>
                      <div class="text-blue larger bold">
                          $<span id="avg-bid">{this.state.averageBid}</span>
                      </div >
                  </span>
                  <span  class="col-md-3 align-c padding-l10 padding-r5 project-view-status">
                      <span>Project Budget Range</span>
                      <span class="text-blue larger bold project-budget">{this.props.project.project.budget_range}</span>
                  </span>
              </div>
              <div>
                <button className = "btn btn-success pull-right font-bold" onClick = {this.toggleBidForm}>Bid Now!</button>

              </div>
            </div>
          </div>
        </div>
        <div className = "project-details-div">
          <h5 className = "project-subheader">Project Description : </h5> <br/>
          <textarea className = "form-control project-desc-text" readOnly >{this.props.project.project.description}</textarea>
        </div>
        <div className = "project-details-div">
          <h5  className = "project-subheader">Skills Required : </h5 >
          {this.props.project.skills.map(skill => <span>{skill.name}, </span>)}
        </div>
        {this.props.project.file ?
        <div className = "project-details-div">
          <h5 className = "project-subheader">Files : </h5>
          <span>{this.props.project.file}</span>
        </div> :null }
        {this.state.showComponent ?
           <BidForm projectID = {this.props.project.project.project_id}/> :
           null
        }
        <UserBidList users = {this.props.project.usersBidded}/>

    </div>
  )
}

}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails);
