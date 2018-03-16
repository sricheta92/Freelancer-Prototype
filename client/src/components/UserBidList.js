import React, {Component} from 'react';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

  }

const mapStateToProps = (state) => {
    return {
      //projectBidStatus: state.postProjectReducer.projectBidStatus
    }
}


class UserBidList extends Component{

  render(){
    return(
      <div id="bid-list-container" class="bid-list-containerWrapper Card Container">
        <div>
          <div id="bid-list-header" class="wider bid-list-freelancer">
            <div class="bid-user-info-header padding-t5 padding-b5 margin-l0">
              <a href="#"  class="text-white bold padding-l10">
                  Freelancers Bidding
                  <span id="bid-count">
                      (<span>21</span>)
                  </span>
                  <i class="disable-temp icon-white"></i>
              </a>
            </div>
            <div class="bid-sum-header padding-t5 align-c">
                <a href="#" class="text-white bold">
                    Bid (USD)
                    <i class="disable-temp icon-white"></i>
                </a>
            </div>
          </div>
            {this.props.users ?
          <div id="bid-list" class="Grid-col Grid-col--12 bid-list-freelancerWrapper  wider">
          {this.props.users.map(user =>
            <div class="bid " >
              {user.username}
            </div>
          )}
          </div> : <div>No freelancer bidded yet for this project!</div> }
        </div>
      </div>
    )

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(UserBidList);
