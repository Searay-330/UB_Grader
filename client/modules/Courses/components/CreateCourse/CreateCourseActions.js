import callApi from '../../../../util/apiCaller';

export function submitForm(formData) {
	var data;
	data = new FormData();
	data.append("course_num", formData.course_num);
	data.append("display_num", formData.category);
	data.append("semester", formData.displayName);
  	
  	var instructorData = new FormData();
  	instructorData.append("student_email", formData.student_email);
  	instructorData.append("course_role", 'instructor');

  	return function (dispatch) {
	    dispatch(() => {return {type:"wait"};});
	    return callApi("courses/create", 'post', data).then(data => {
	        console.log(data);
	     //    dispatch(() => {return {type:"wait"};});
	    	// return callApi("courses/" + formData.course_num + "/enroll", 'post', instructorData).then(instructorData => {
	     //    		console.log(instructorData);
	     //  		})
	      })
  	}
}

