import callApi from '../../util/apiCaller';

export function createStudentGrades(data){
  return {type:"student_grades", gradeData: data};
}

export function getStudentGrades(courseNum, email) {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApi("courses/" + courseNum + "/submissions/" + email + "/latest").then(
      data => { dispatch(createStudentGrades(data))}
    )
  }
}

export function createProfessorGrades(assignmentNum, data){
  return {type:"professor_grades", assignmentNum: assignmentNum, gradeData: data};
}

export function getProfessorGrades(courseNum, assignmentNum, email) {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    //TODO
    return callApi("courses/" + courseNum + "/assignments/" + assignmentNum + "/submissions/").then(
      data => { dispatch(createProfessorGrades(data))}
    )
  }
}