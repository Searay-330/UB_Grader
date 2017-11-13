import callApi, {callApiWithFiles} from '../../../../util/apiCaller';



export function getCategories(assignmentsData){
	var categories = [];
	for (var i = 0; i < assignmentsData.length; ++i) {
		if (!categories.includes(assignmentsData[i].category)) {
			categories.push(assignmentsData[i].category);
		}
	}
	return categories;    
}

export function throwError(message){
	return {type:"error", error: message};
}


export function resetError(){
	return {type:"error", error:""};
}

export function redirect(){
	return {type:"redir"};
}


export function redirectReset(){
	return {type: "redirr"};
}



export function submitForm(formData, course) {
	return function (dispatch) {
		dispatch(resetError());
		var hold = undefined;
		var data;



		data = new FormData();

		formData.name = formData.name.replace(/[^A-Za-z0-9\-\_]+/g, '');
	//must be FIRST
	if(formData.name != "" && formData.name != "create") {
		data.append("id", encodeURIComponent(formData.name));
	}else{ 
		return dispatch(throwError("Assignment Name Is A Required Field Or Your String Contained No Urlable Chars")); 
	};

	//dates
	hold = validateDates(formData);
	if(hold == "skip"){
		hold = undefined;
	}else if(hold){
		return dispatch(throwError(hold));
	}else{
		data.append("start_date", formData.startDate);
		data.append("due_date", formData.dueDate);
		data.append("end_date", formData.endDate);
	}

	//files
	hold = validateFiles();
	if(hold == "skip"){
		hold = undefined;
	}else if(hold){
		return dispatch(throwError(hold));
	}else{
		data.append("make", document.getElementById("make").files[0]);
		data.append("tar", document.getElementById("tar").files[0]);
	}

	//problems
	hold = validateProblems(formData.problems);
	if(hold == "skip"){
		hold = undefined;
	}else if(hold){
		return dispatch(throwError(hold));
	}else{
		data.append("problems", JSON.stringify(formData.problems));
	}
	
	//everything else
	hold = (!hold) ? (formData.category != "") ? data.append("category", formData.category) : "Category Is A Required Field" : hold;
	hold = (!hold) ? (formData.displayName != "") ? data.append("name", formData.displayName) : "Display Name Is A Required Field" : hold;

	data.append("section_based",false);
	data.append("auto_grader", (document.getElementById("tar") != null && document.getElementById("make") != null && document.getElementById("tar").files[0] && document.getElementById("make").files[0]) ? true : false);

	if(hold){
		return dispatch(throwError(hold));
	}
	return callApiWithFiles("courses/" + course + "/assignments/create", data)
	.then(data => {
		if(data.hasOwnProperty("Message")){
			dispatch(throwError(data["Message"]));
		}else{
			dispatch(redirect());
		}
	});
}
	
    
}

function validateDates(formData){
	if(formData.startDate == null && formData.startTime == null && formData.dueDate == null && formData.dueTime == null && formData.endDate == null && formData.endTime == null){
		return "skip";
	}
	if(formData.startDate == null){
		return "Please Enter A Vaild Start Date";
	}
	if(formData.startTime == null){
		return "Please Enter A Vaild Start Time";
	}
	if(formData.dueDate == null){
		return "Please Enter A Vaild Due Date";
	}
	if(formData.dueTime == null){
		return "Please Enter A Vaild Due Time";
	}
	if(formData.endDate == null){
		return "Please Enter A Vaild End Date";
	}
	if(formData.endTime == null){
		return "Please Enter A Vaild End Time";
	}


	formData.startDate.setHours(formData.startTime.getHours(),formData.startTime.getMinutes(),0, 0);
	formData.dueDate.setHours(formData.dueTime.getHours(),formData.dueTime.getMinutes(),0, 0);
	formData.endDate.setHours(formData.endTime.getHours(),formData.endTime.getMinutes(),0, 0);

	if(formData.startDate.getTime() > formData.dueDate.getTime()){
		return "Due Date Must Come After Start";
	}

	if(formData.dueDate.getTime() > formData.endDate.getTime()){
		return "End Date Must Come After Due";
	}


	return undefined;
}

function validateFiles(){
	if(document.getElementById("make") == null && document.getElementById("tar") == null){
		return "skip";
	}
	if(document.getElementById("make").files[0] && !document.getElementById("tar").files[0]){
		return "Please Input A Vaild Tar File";
	}
	if(!document.getElementById("make").files[0] && document.getElementById("tar").files[0]){
		return "Please Input A Vaild Make File";
	}
	return undefined;
}

function validateProblems(problems){
	var problemNames = [];
	if(problems.length == 0){
		return "skip";
	}
	for(var i = 0; i < problems.length; ++i){
		if(problems[i].problem_name == "" && isNaN(parseInt(problems[i].score))){
			continue;
		}
		if(problems[i].problem_name != "" && isNaN(parseInt(problems[i].score))){
			return "Please Enter A Vaild Number For Score In Problem " + i;
		}
		if(problems[i].problem_name == "" && !isNaN(parseInt(problems[i].score))){
			return "Please Enter A Vaild Name For Problem " + i;
		}
		if(problems[i].problem_name == "" && isNaN(parseInt(problems[i].score)) && problems[i].score != ""){
			return "Please Enter A Vaild Name For The Problem And A Vaild Score For Problem " + i;
		}
		if(problemNames.includes(problems[i].problem_name)){
			return "Problem " + problemNames.indexOf(problems[i].problem_name) + " And Problem " + i + " Have The Same Name";
		}

		problemNames.push(problems[i].problem_name);
	}
	return undefined;
}