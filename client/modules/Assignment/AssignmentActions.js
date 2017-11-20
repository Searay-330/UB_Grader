import callApi, { callApiWithFiles } from '../../util/apiCaller';

export function createFileSubmission() {
    return {type: 'file_submission'};
}

export function submitFile(courseNum, assignmentId, file) {
    var submission = new FormData();
    submission.append("files", file);
    console.log(submission);
    return function (dispatch) {
        dispatch(() => {return {type:"wait"};});
        return callApiWithFiles("courses/"+courseNum+"/assignments/"+assignmentId+"/submissions/create", submission).then(
              data => {dispatch(createFileSubmission())
        })
    }
}

export function createRecentSubmission(data) {
    return {type: 'submission', submission: data};
}

export function getRecentSubmission(courseNum, assignmentId, userEmail) {
    return function (dispatch) {
        dispatch(() => {return {type:"wait"};});
        var path = "courses/" + courseNum+ "/assignments/" + assignmentId + "/submissions/user/" + userEmail;
        return callApi(path, "get").then(
            data => {dispatch(createRecentSubmission(data.Content))}
        )
      }
}