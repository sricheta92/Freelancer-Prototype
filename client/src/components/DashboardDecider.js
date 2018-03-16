import React,{Component} from 'react';
import AsFreelancer from './AsFreelancer';
import AsEmployer from './AsEmployer';

class DashboardDecider extends Component{

  constructor(props){
    super(props);

  }

    render(){

      return(
        <div>
        {this.props.role === 'Worker' ?
           <AsFreelancer />
        :
      <AsEmployer /> 
        }
        </div>
      );
    }
}

export default DashboardDecider;
