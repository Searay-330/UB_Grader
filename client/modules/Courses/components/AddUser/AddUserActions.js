import callApi, {callApiWithFiles} from '../../../../util/apiCaller';

export function submitForm(formData) {
	var data;
  	data = {student_email: formData.student_email, course_role: formData.course_role};

  	return function (dispatch) {
	    dispatch(() => {return {type:"wait"};});
	    return callApi("courses/" + formData.course_num + "/enroll", 'post', data).then(data => {
	       	console.log(data);
	    })
  	}
}