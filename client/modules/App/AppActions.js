import callApi from '../../util/apiCaller';
export function userSwap(name){
  return {type:"login", user: name};
}


export function getUserLoggedIn() {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApi("/current_user","get")
      .then(text => {
        dispatch(userSwap(text.first_name))
      })
  }
}