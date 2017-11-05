import callApi, {callApiWithFiles} from '../../../../util/apiCaller';

export function throwError(message, type){
	return {type:"error", error: message, errorType: type};
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
  			return dispatch(throwError("Course not found. How did you even get here?", "error"));
  		}
  		if(formData.student_email == ""){
  			return dispatch(throwError("Please provide a user email.", "error"));
  		}
  		if(formData.course_role == ""){
  			return dispatch(throwError("Please provide a valid course role (Defaults are 'instructor' and 'student')", "error"));
  		}
  		if(formData.course_role != 'instructor' && formData.course_role != 'student'){
  			return dispatch(throwError("Custom roles are currently unsupported. Please type either student or instructor.", "error"));
  		}
	    dispatch(() => {return {type:"wait"};});
	    return callApi("courses/" + formData.course_num + "/enroll", 'post', data).then(data => {
	       	console.log(data);
	       	if(data.Status == "404"){
	       		return dispatch(throwError(JSON.stringify(data)), "error");
	       	}
	       	return dispatch(throwError("User added successfully.", "success"));
	    })
  	}
}
export function submitCSV(formData1, formData) {
	//var data;
  	//data = {student_email: formData.student_email, course_role: formData.course_role};
  	var formDataCSV = new FormData();
	formDataCSV.append("complete", "false");

        formDataCSV.append("WhoseIdeaWasThis", formData1);
        
  	return function (dispatch) {
  		dispatch(resetError());
  		if(formData.course_num == ""){
  			return dispatch(throwError("Course not found. How did you even get here?", "error"));
  		}
  		
	    dispatch(() => {return {type:"wait"};});
	    	  return callApiWithFiles("courses/" + formData.course_num + "/importRoster", formDataCSV).then(formDataCSV => {
	       	console.log(formDataCSV);
	       	if(formDataCSV.Status == "404"){
	       		return dispatch(throwError(JSON.stringify(formDataCSV)), "error");
	       	}
	       	return dispatch(throwError("User added successfully.", "success"));
	    })
  	}


}
