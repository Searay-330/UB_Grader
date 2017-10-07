import callApi, {callApiWithFiles} from '../../../../util/apiCaller';

export function submitForm(formData) {
	var data;
  	data = {course_num: formData.course_num, display_name: formData.display_name, semester: formData.semester};

  	var instructorData;
  	instructorData = {student_email: formData.student_email, course_role: 'instructor'};

  	return function (dispatch) {
	    dispatch(() => {return {type:"wait"};});
	    return callApi("courses/create", 'post', data).then(data => {
	        console.log(data);
	        dispatch(() => {return {type:"wait"};});
	    	return callApi("courses/" + formData.course_num + "/enroll", 'post', instructorData).then(instructorData => {
	        		console.log(instructorData);
	      		})
	      })
  	}
}