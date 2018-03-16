import React, {Component} from 'react';
import DashBoardSwitch from './DashBoardSwitch';

class AsEmployer extends Component{


    constructor(props){
      super(props);
      // this.state = {
      //   isFreelancer = false,
      //   text = 'Employer'
      // }
    }


  render(){
    return(
      <div>
        <DashBoardSwitch  />
          AsEmployer
      </div>
    );
  }
}

export default AsEmployer;
