import * as actionType from './ActionType';
import axios from 'axios';

export function checkEmail(state) {

  return function (dispatch) {
		let temp = {
			"email": state.email
		};
		return axios.post("http://localhost:5000/signup/checkEmail", temp).
    then((response) => {
			if( response.data){
				dispatch({type:actionType.EMAIL_VALID, payload: response.data})
			}
		}).catch((err) => {
			 dispatch({type:actionType.EMAIL_INVALID, payload: err.response.data})
		})
	}

};

export function signup(state) {

  return function (dispatch) {
    let temp = {
      "username": state.username,
      "email" :state.email,
      "password" :state.password

    };
    return axios.post("http://localhost:5000/signup", temp).then((response) => {
      if( response.data){
        dispatch({type:actionType.SIGNUP_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.SIGNUP_FAIL, payload: err.response.data})
    })
  }

}


export function checkUser(state) {

  return function (dispatch) {
    let temp = {
      "username": state.username
    };
    return axios.post("http://localhost:5000/signup/checkUser", temp).then((response) => {
      if( response.data){
        dispatch({type:actionType.USERNAME_VALID, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.USERNAME_INVALID, payload: err.response.data})
    })
  }


}

export function login(state){
    return function (dispatch) {
      let temp = {
        "useroremail" : state.useroremail,
        "password": state.password
      }

      return axios.post("http://localhost:5000/login", temp).then((response) => {
        if( response.data.token){
          localStorage.setItem('jwtToken', response.data.token);
  				localStorage.setItem('userid', response.data.userid);
          localStorage.setItem('username', response.data.username);
  			  dispatch({type:actionType.LOGIN_SUCCESS, payload: response.data})
			  }
      }).catch((err) => {
         dispatch({type:actionType.LOGIN_FAIL, payload: err.response.data})
      })
    }
}

export function getAllSkills(state){
  return function(dispatch){
   return axios.get("http://localhost:5000/skill/allSkills").then((response) => {
      if( response.data){
        dispatch({type:actionType.GET_SKILLS_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.GET_SKILLS_FAILURE, payload: err.response.data})
    })
  /*  dispatch({
      type : actionType.GET_SKILLS_SUCCESS,
      payload : ['Java', 'PHP', 'XML', 'reactjs','Spring','Excel','Word','DB2','HTML5','CSS','Management']
    }) */

  }
}

export function getAllCategories(state){
    return function(dispatch){
      return axios.get("http://localhost:5000/skill/allCategories").then((response) => {
          if( response.data){
            dispatch({type:actionType.GET_CATEGORY_SUCCESS, payload: response.data})
          }
        }).catch((err) => {
           dispatch({type:actionType.GET_CATEGORY_FAILURE, payload: err.response.data})
        })

    }
}

export function getAllSkillsByCategory(state){
  return function(dispatch){

    return axios.get("http://localhost:5000/skill/skillsByCategory" ).then((response) => {
      if( response.data){
        dispatch({type:actionType.GET_SKILLS_BY_CATEGORY_SUCCESS, payload: response.data})
      }
    }).catch((err) => {
       dispatch({type:actionType.GET_SKILLS_BY_CATEGORY_FAILURE, payload: err.response.data})
    })
  }

}

export function completeProfile(state){

  return function (dispatch){

      let temp = {
        "fname": state.fname,
        "lname" :state.lname,
        "city" :state.city,
        "phone" :state.phone,
        "userID" :state.userID,
        "profilePic" : state.profilePic
      };
    return axios.post("http://localhost:5000/signup/withDetails",temp).then((response) => {
       if( response.data){
         dispatch({type:actionType.COMPLETE_PROFILE_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.COMPLETE_PROFILE_FAILURE, payload: err.response.data})
     })

  }
}

export function mapSkillToUser(state){

  return function(dispatch) {
    let temp ={
        "userID" :state.userID,
        "skills" : state.skills
    };
    return axios.post("http://localhost:5000/skill/withDetails",temp).then((response) => {
       if( response.data){
         dispatch({type:actionType.COMPLETE_PROFILE_SKILL_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.COMPLETE_PROFILE_SKILL_FAILURE, payload: err.response.data})
     })
  }
}

export function skillRemoved(state){
  return function(dispatch){  dispatch({
      type:actionType.SKILL_REMOVED,
      payload : state.skills
    });
  }
}

export function skillAdded(state){
  return function(dispatch){  dispatch({
      type:actionType.SKILL_ADDED,
      payload : state.skills
    });
  }
}

export function handleFileUpload(state,file){
  return function(dispatch){

    var data = new FormData();
  	data.append("file", file);
    return axios.post("http://localhost:5000/project/uploadFiles", data).then((response) => {
       if( response.data){
         dispatch({type:actionType.FILE_UPLOAD_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.FILE_UPLOAD_FAILURE, payload: err.response.data})
     })

  }
}

export function postProject(state){
  return function(dispatch){

    let data = {
      project_name : state.projectname,
      description : state.projectdesc,
      budget_range :state.budget,
      project_pay_type :state.selectedOption
    }

    return axios.post("http://localhost:5000/project/postprojects", data).then((response) => {
       if( response.data){
         dispatch({type:actionType.POST_PROJECT_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.POST_PROJECT_FAILURE, payload: err.response.data})
     })

  }
}

export function mapfilesToProject(props){
  return function(dispatch){
    let data = {
      projectid : props.projectid,
      filepath :props.uploadname
    }
    return axios.post("http://localhost:5000/project/mapFilesToProject", data).then((response) => {
       if( response.data){
         dispatch({type:actionType.MAP_FILES_TO_PROJECT_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.MAP_FILES_TO_PROJECT_FAILURE, payload: err.response.data})
     })
 }
}

export function mapSkillToProject(props,state){
  return function(dispatch){
    let data = {
      projectid : props.projectid,
      skills : state.selectedSkills
    }
    return axios.post("http://localhost:5000/project/mapSkillToProject", data).then((response) => {
       if( response.data){
         dispatch({type:actionType.MAP_SKILLS_TO_PROJECT_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.MAP_SKILLS_TO_PROJECT_FAILURE, payload: err.response.data})
     })
 }
}

export function mapProjectToUser(state,props){
    return function(dispatch){
      let data = {
        projectid : props.projectid,
        userid :props.userID,
        role : state.role
      }
      return axios.post("http://localhost:5000/project/mapProjectToUser", data).then((response) => {
         if( response.data){
           dispatch({type:actionType.MAP_PROJECT_TO_USER_SUCCESS, payload: response.data})
         }
       }).catch((err) => {
          dispatch({type:actionType.MAP_PROJECT_TO_USER_FAILURE, payload: err.response.data})
       })
    }
}

export function getRecommendedProjects(props){
  return function(dispatch){
    return axios.get("http://localhost:5000/project/mapRecommendedProjects/"+ props.userID ).then((response) => {
       if( response.data){
         dispatch({type:actionType.GET_RECOMMENDED_PROJECTS_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.GET_RECOMMENDED_PROJECTS_FAILURE, payload: err.response.data})
     })
  }
}

export function getProjectDetails(data) {
    return {
      type: actionType.GET_PROJECT_DETAILS_SUCCESS,
      data
    }
  }

export function saveBidOfUser(state){
  return function(dispatch){
    let temp = {
			"user_id": state.user_id,
      "project_id" :state.project_id,
      "bid_days" :state.bid_days,
      "bid_price" :state.bid_price
		};
    return axios.post("http://localhost:5000/project/bidproject",temp).then((response) => {
       if( response.data){
         dispatch({type:actionType.PROJECT_BID_SUCCESS, payload: response.data})
       }
     }).catch((err) => {
        dispatch({type:actionType.PROJECT_BID_FAILURE, payload: err.response.data})
     })
  }
}
