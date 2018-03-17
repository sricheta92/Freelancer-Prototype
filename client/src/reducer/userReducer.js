import * as actionType from '../actions/ActionType';

export function userReducer(state={}, action){

  const newState = {...state};
  switch(action.type){

      case actionType.GET_BIDDED_PROJECTS_SUCCESS : newState.projectsBiddedByMe = action.payload.projectsBiddedByMe;
                                                    return newState;

      case actionType.GET_BIDDED_PROJECTS_FAILURE : newState.projectsBiddedByMe = undefined;
                                                    return newState;

      case actionType.DASHBOARD_VIEW_TYPE : newState.dashboardViewisWorker = action.data;
                                            return newState;

      case actionType.GET_POSTED_PROJECTS_SUCCESS : newState.projectsPostedByMe = action.payload.projectsPostedByMe;
                                                    return newState;

      case actionType.GET_POSTED_PROJECTS_FAILURE : newState.projectsPostedByMe = undefined;
                                                    return newState;

      default : return newState;
  }
}
