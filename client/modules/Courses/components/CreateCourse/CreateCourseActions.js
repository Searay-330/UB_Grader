import callApi, {callApiWithFiles} from '../../../../util/apiCaller';

export function throwError(message, type){
	return {type:"error", error: message, errorType: type};
}

export function resetError(){
	return {type:"error", error:""};
}

export function submitForm(formData) {
	var data;
  	data = {course_num: formData.course_num, display_name: formData.display_name, semester: formData.semester};

  	var instructorData;
  	instructorData = {student_email: formData.student_email, course_role: 'instructor'};

  	return function (dispatch) {
	    dispatch(() => {return {type:"wait"};});
	    dispatch(resetError());
	    if(formData.display_name == ""){
	   		return dispatch(throwError("Please enter a Display Name", "success"));
	   	}
	   	if(formData.course_num == ""){
	   		return dispatch(throwError("Please enter a Course Num", "error"));
	   	}
	   	if(formData.semester == ""){
	   		return dispatch(throwError("Please enter a Semester", "error"));
	   	}
	   	if(formData.student_email == ""){
	   		return dispatch(throwError("Please enter an Instructor Email", "error"));
	   	}
	    return callApi("courses/create", 'post', data).then(data => {
	        dispatch(() => {return {type:"wait"};});
	    	return callApi("courses/" + formData.course_num + "/enroll", 'post', instructorData).then(instructorData => {
	        		console.log(instructorData);
	        		if(instructorData.Status == "404"){
	        			return dispatch(throwError(JSON.stringify(instructorData), "success"));
	        		}
	        		return dispatch(throwError("Course created successfully. Don't mind the scary red color, our green one is in the shop.", "success"));
	      		})
	      })
  	}
}