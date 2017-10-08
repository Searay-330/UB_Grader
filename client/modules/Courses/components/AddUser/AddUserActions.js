import callApi, {callApiWithFiles} from '../../../../util/apiCaller';

export function throwError(message){
	return {type:"error", error: message};
}

export function resetError(){
	return {type:"error", error:""};
}

export function submitForm(formData) {
	var data;
  	data = {student_email: formData.student_email, course_role: formData.course_role};
  	
  	return function (dispatch) {
  		dispatch(resetError());
  		if(formData.course_num == ""){
  			return dispatch(throwError("Course not found. How did you even get here?"));
  		}
  		if(formData.student_email == ""){
  			return dispatch(throwError("Please provide a user email."));
  		}
  		if(formData.course_role == ""){
  			return dispatch(throwError("Please provide a valid course role (Defaults are 'instructor' and 'student')"));
  		}
  		if(formData.course_role != 'instructor' && formData.course_role != 'student'){
  			return dispatch(throwError("Custom roles are currently unsupported. Please type either student or instructor."));
  		}
	    dispatch(() => {return {type:"wait"};});
	    return callApi("courses/" + formData.course_num + "/enroll", 'post', data).then(data => {
	       	console.log(data);
	       	if(data.Status == "404"){
	       		return dispatch(throwError(JSON.stringify(data)));
	       	}
	       	
	    })
  	}
}