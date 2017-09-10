

// Initial State
const initialState = {
  text: "hello",
  postText: "input name in the box and click button to see it here",
};

const BsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get":
      return {
        text: action.text,
        postText: state.postText
      };

    case "wait":
    	return state

    case "post":
      return {
        text: state.text,
        postText: action.postText
      } 

    default:
      return state;
  }
};


// Export Reducer
export default BsReducer;
