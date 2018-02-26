import React , { Component} from 'react';

class NavBar extends Component{

  render(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand a-logo" href="#"><img className = "logo" src = "./images/icon.PNG"></img></a>
          </div>
          <ul className="nav navbar-nav">
            <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> Work <span class="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Page 1-1</a></li>
                  <li><a href="#">Page 1-2</a></li>
                  <li><a href="#">Page 1-3</a></li>
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
            <li><a href = "#"> <span className="fa fa-commenting-o comment-icon"></span></a></li>
            <li><a href="#"><span className="  glyphicon glyphicon-bell"></span></a></li>
             <li><a href="#"><span className="glyphicon glyphicon-globe"></span></a></li>
           <li><a href="#"><span className="glyphicon glyphicon-user"></span></a></li>

         </ul>
         <form className="navbar-form navbar-right" action="/action_page.php">
          <div className="input-group">

            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
           </button>
            </div>
            <input type="text" class="form-control" placeholder="Search" name="search"/>
          </div>
        </form>
        </div>
      </nav>

    )
  }
}

export default NavBar;
