import callApi from '../../util/apiCaller';

export function createStudentGrades(data) {
  return { type: "student_grades", gradeData: data };
}

export function getStudentGrades(courseNum, email) {
  return function (dispatch) {
    dispatch(() => { return { type: "wait" }; });
    return callApi("courses/" + courseNum + "/submissions/" + email + "/latest").then(
      data => { dispatch(createStudentGrades(data)) }
    )
  }
}

export function createProfessorGrades(data) {
  return { type: "professor_grades", gradeData: data };
}

export function getProfessorGrades(courseNum) {
  return function (dispatch) {
    dispatch(() => { return { type: "wait" }; });
    return callApi("courses/" + courseNum + "/submissions/latest").then(
      data => { dispatch(createProfessorGrades(data)) }
    )
  }
}

export function createCourseRoster(data) {
  return { type: "roster", roster: data };
}

export function getCourseRoster(courseNum) {
  return function (dispatch) {
    dispatch(() => { return { type: "wait" }; });
    return callApi("courses/" + courseNum + "/students").then(
      data => { dispatch(createCourseRoster(data)) }
    )
  }
}