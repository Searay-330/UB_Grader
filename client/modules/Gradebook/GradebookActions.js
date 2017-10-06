import callApi from '../../util/apiCaller';

export function populateGrades(data){
  return {type:"populate", gradeData: data};
}

export function getGrades() {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    //TODO
    return callApi("").then(
      data => { dispatch(populateGrades(data))}
    )
  }
}