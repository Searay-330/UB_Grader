import callApi from '../../util/apiCaller';
export function userSwap(name){
  return {type:"login", user: name};
}

export function perms(user){
	var admin = false;
	var coursePerms = [];
	if(user["sys_role"]){
		admin = true;
    }
    for(var i = 0; i < user.courses.length; i++){
        coursePerms[user.courses[i].course_num] = (admin)? "admin" : user.courses[i].course_role;
    }

    return {type:"perms", perm: coursePerms, admin: admin};
}


export function getUserLoggedIn() {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApi("/current_user","get")
      .then(text => {
        dispatch(userSwap(text));
        dispatch(perms(text));
      })
  }
}