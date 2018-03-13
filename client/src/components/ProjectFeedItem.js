import React,{Component} from 'react';

class ProjectFeedItem extends Component{

  render(){
    return(
      <div>
        {this.props.projectfeeditem.project_name}
      </div>
    );
  }

}

export default ProjectFeedItem;
