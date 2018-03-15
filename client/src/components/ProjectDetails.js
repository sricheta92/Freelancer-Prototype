import React, {Component} from 'react';
import { connect } from 'react-redux';
import FixedNav from './FixedNav';


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
  }

  static defaultProps = {
     project: {
       projectname :'',

     }
  }

render(){
  return(
    <div>
      <FixedNav />
      <div className = "gaf-container" >
      <div id="projectHeader">
                <div class="project-header-controls span8">
                    <h1 class="project_name largest bold margin-b5 span12">{this.props.project.project_name}</h1>
                    <div class="span12 margin-0"></div>
                </div>
              <div class="clear"></div>
        </div>
        <div class="well well2 white silver span padding-5 align-c margin-t10 margin-l10 margin-b10 PageFreelancerPvp-infoBar-details">
          <div  class="align-c padding-r10 padding-l5 project-view-status">
                <p>Bids</p>
                <span id="num-bids" class="text-blue larger bold">4</span>

                <span  class="align-c padding-l10 padding-r10 border-r border-l project-view-status">
                    <p>Avg Bid (USD)</p>
                    <div class="text-blue larger bold">
                        $<span id="avg-bid">25</span>
                    </div>
                </span>
            </div>

            <div  class="align-c padding-l10 padding-r5 project-view-status">
                <p>Project Budget(USD)</p>
                <div class="text-blue larger bold project-budget">  $10 - $30  </div>
            </div>
        </div>
        </div>
    </div>
  )
}

}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails);
