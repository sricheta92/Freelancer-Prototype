import React , { Component} from 'react';


class NavBar2 extends Component{

  render(){
    return(
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


    )
  }


}

export default NavBar2;
