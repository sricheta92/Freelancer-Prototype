import React,{Component} from 'react';
import Switch from "react-switch";
import { connect } from 'react-redux';

class DashBoardSwitch extends Component{

  constructor(props) {
    super(props);
    let isWorker;
    if(localStorage.getItem("role") ==='Worker'){
      isWorker = true;
    }else{
      isWorker= false;
    }
    this.state = { checked: isWorker };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    var checked, unchecked;
    if(localStorage.getItem("role") ==='Worker'){
      checked = 'Worker';
      unchecked = 'Employer';
    }else{
      checked = 'Employer';
      unchecked = 'Worker';
    }
   return (
           <label htmlFor="normal-switch" className = "dashboard-switch">
             <Switch
               onChange={this.handleChange}
               checked={this.state.checked}
               id="normal-switch"
               checkedIcon = {checked}
               uncheckedIcon = {unchecked}

             />
           </label>
         );
       }
}

export default DashBoardSwitch;
