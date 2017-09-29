import callApi from '../../util/apiCaller';

export function populateAssignmentData(data){
	
  return {type:"populate", assignmentData: data};
}

export function getAssignmentData(course_num, asst_name) {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApi("courses/" + course_num + "/assignments/" + asst_name,"get")
      .then(data => {
        dispatch(populateAssignmentData(data))
      })
  }
}