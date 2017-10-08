import callApi, { callApiWithFiles } from '../../util/apiCaller';

export function createFileSubmission(data) {
    return {type: 'file_submission', file: data};
}

export function submitFile(courseNum, assignmentNum, file) {
    return function (dispatch) {
        dispatch(() => {return {type:"wait"};});
        return callApiWithFiles("courses/"+courseNum+"/assignments/"+assignmentNum+"/submissions/create").then(
              data => {dispatch(createFileSubmission(file))
        })
    }
}

export function createRecentSubmission(data) {
    return {type: 'score', submission: data};
}

export function getRecentScore(courseNum, assignmentNum, userEmail) { 
    return function (dispatch) {
        dispatch(() => {return {type:"wait"};});
        var path = "courses/" + courseNum+ "/assignments/" + assignmentNum + "/submissions/" + userEmail + "/latest";
        return callApi(path, "get").then(data => {
            dispatch(createRecentSubmission(data))
          })
      }
}