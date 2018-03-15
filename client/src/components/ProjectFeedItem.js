import React,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getProjectDetails} from '../actions';

const mapDispatchToProps = (dispatch) => {

    let actions = {getProjectDetails};
    return { ...actions, dispatch };

  }

const mapStateToProps = (state) => {
    return {
      //  project : state.postProjectReducer.project
    }
}


class ProjectFeedItem extends Component{


  constructor(props){
    super(props);
    this.navigateToProjectDetails = this.navigateToProjectDetails.bind(this);
  }

  navigateToProjectDetails()  {
    this.props.dispatch(this.props.getProjectDetails(this.props.projectfeeditem))
    this.props.history.push("/projectDetails");
  }

  render(){
    return(
      <div className ="news-list-wrapper">
        <a onClick={this.navigateToProjectDetails}><h4 className = "" >
          {this.props.projectfeeditem.project_name}
        </h4></a>
        <button className = "btn btn-success pull-right">Bid Now!</button>
        <span> {this.props.projectfeeditem.budget_range}</span>
        <div>  {this.props.projectfeeditem.description}</div>
        {this.props.projectskills ? this.props.projectskills.map( skill => <div>{skill.name}</div>) : null}
        <span>{this.props.postedBy.username}</span>
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProjectFeedItem));
