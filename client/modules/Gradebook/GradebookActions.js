import callApi from '../../util/apiCaller';

export function populateGrades(data){
  return {type:"grades", gradeData: data};
}

export function getGrades(courseNum, assignmentName) {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    //TODO
    return callApi("courses/" + courseNum + "/assignments/" + assignmentName + "/submissions").then(
      data => { dispatch(populateGrades(data))}
    )
  }
}