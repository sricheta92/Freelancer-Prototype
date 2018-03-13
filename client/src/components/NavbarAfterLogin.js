import  React , { Component} from 'react';
import {Popover} from 'react-bootstrap';
import NavBar2 from './NavBar2';
import PostProject from './PostProject';
import ProjectFeedItem from './ProjectFeedItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRecommendedProjects } from '../actions'

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
    userID :localStorage.getItem("userid"),
    recommendedProjects :state.postProjectReducer.recommendedProjects
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
    this.handleLogout = this.handleLogout.bind(this);
  }

  static defaultProps = {
    recommendedProjects: []
  }

  componentWillMount(){
    this.props.dispatch(getRecommendedProjects(this.props));
  }

  handleLogout(){
  	localStorage.removeItem('userid');
  	localStorage.removeItem('jwtToken');
  	localStorage.removeItem('username');
  	this.props.history.push('/login');
  }

  render(){
    return(
    <div>
        <nav className="navbar navbar-default navbar1">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand a-logo" href="#"><img className = "logo" src = "./images/icon.PNG"></img></a>
            </div>


      <ul className="nav navbar-nav">
        <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#"> Work <span class="caret"></span>
        </a>
            <ul className="dropdown-menu">

              <Popover
                  id="popover-basic"
                  placement="bottom"
                  title="Popover right">
                  <li><a href="#">Page 1-1</a></li>
                  <li><a href="#">Page 1-2</a></li>
                  <li><a href="#">Page 1-3</a></li>
                </Popover>

            </ul>


          </li>

          <li className="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"> My Projects <span class="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Page 1-1</a></li>
                <li><a href="#">Page 1-2</a></li>
                <li><a href="#">Page 1-3</a></li>
              </ul>
            </li>

      </ul>
          <ul className="nav navbar-nav navbar-right">
            {/*<li><a href = "#"> <span className="fa fa-commenting-o comment-icon"></span></a></li>*/}
            <li><a href="#"><span className="  glyphicon glyphicon-bell"></span></a></li>
             {/*<li><a href="#"><span className="glyphicon glyphicon-globe"></span></a></li>*/}
           <li><a href="#"><span className="glyphicon glyphicon-user"></span></a></li>
              <li><a><button type="button" class="btn btn-default btn-sm" onClick = {this.handleLogout}>
            <span class="glyphicon glyphicon-log-out"></span> Log out
          </button></a></li>

         </ul>
         <form className="navbar-form navbar-right" action="/action_page.php">
          <div className="input-group">

            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
           </button>
            </div>
            <input type="text" className="form-control" placeholder="Search" name="search"/>
          </div>
        </form>

      </div>
        </nav>
        <nav className="navbar navbar-inverse navbar2 ">
          <div className="container-fluid">

            <ul className="nav navbar-nav">
              <li className="active"><a href="#">My Projects</a></li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Inbox</a></li>
            </ul>
              <button className="btn navbar-btn btn-pull-right">Post a Project</button>
          </div>


        </nav>
        Welcome {this.props.username}
        <div class="panel panel-primary col-md-8 col-offset-md-4 ">
          <div class="panel-heading ">Job Feed</div>
          {this.props.recommendedProjects ?
          <div class="panel-body ">
            {this.props.recommendedProjects.map(project =>
              <ProjectFeedItem projectfeeditem = {project}/> )}
          </div>
          : <div class="panel-body ">Add skills to get job feed</div>}

        </div>

      </div>
    );


  }

}

export default withRouter(connect(mapStateToProps)(NavbarAfterLogin));
