import callApi from '../../util/apiCaller';

export function getFunc(text){
  return {type:"get", text: text};
}

export function postFunc(textFromBox){
  return {type:"post", postText: textFromBox};
}

export function requested(){
  return {type:"waitG"};
}



export function getRequest() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requested())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return callApi("/test")
      .then(text => {
        dispatch(getFunc(text))
      }
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        
      )
  }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function postRequest(text) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(() => {return {type:"wait"};});

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return callApi("/ptest","post", {user:text})
      .then(text => {
        dispatch(postFunc(text))
      }
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        
      )
  }
}

