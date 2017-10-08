import callApi from '../../util/apiCaller';

export function createStudentGrades(assignmentNum, data){
  return {type:"student_grades", assignmentNum: assignmentNum, gradeData: data};
}

export function getStudentGrades(courseNum, assignmentNum, email) {
  console.log("GETTIN DA GERDS");
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    //TODO
    return callApi("courses/" + courseNum + "/assignments/" + assignmentNum + "/submissions/" + email).then(
      data => { dispatch(createStudentGrades(assignmentNum, data))}
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

export function createUserData(data) {
  return {type:"user", userInfo: data};
}

export function getUserInfo() {
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    //TODO
    return callApi("current_user" ).then(
      data => { dispatch(createProfessorGrades(data))}
    )
  }
}