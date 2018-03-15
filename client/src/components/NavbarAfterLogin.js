import  React , { Component} from 'react';
import {Popover} from 'react-bootstrap';
import NavBar2 from './NavBar2';
import PostProject from './PostProject';
import ProjectFeedItem from './ProjectFeedItem';
import FixedNav from './FixedNav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRecommendedProjects } from '../actions'

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
    userID :localStorage.getItem("userid"),
    projectsWithSkills :state.postProjectReducer.projectsWithSkills
  }
}

const mapDispatchToProps = (dispatch)=>{
  console.log("mapDispatchToProps");
  let actions = {getRecommendedProjects};
  return { ...actions, dispatch };
}
class NavbarAfterLogin extends Component{

  constructor(props){
    super(props);

  }

  static defaultProps = {
  //  recommendedProjects: []
  }

  componentDidMount(){
    this.props.dispatch(getRecommendedProjects(this.props));
  }


  render(){
    return(
    <div>
      <FixedNav />

        <div class=" news-feed panel panel-primary col-md-8 col-offset-md-4 ">
          <div class="panel-heading ">Job Feed</div>
          {this.props.projectsWithSkills != undefined ?
          <div class="panel-body ">
            {this.props.projectsWithSkills.map(projectsWithSkill =>
              <ProjectFeedItem key={projectsWithSkill.project.project_id} postedBy = {projectsWithSkill.postedBy} projectskills = {projectsWithSkill.skills} projectfeeditem = {projectsWithSkill} /> )}
          </div>
          : <div class="panel-body ">Add skills to get job feed</div>}

        </div>

      </div>
    );


  }

}

export default withRouter(connect(mapStateToProps)(NavbarAfterLogin));
