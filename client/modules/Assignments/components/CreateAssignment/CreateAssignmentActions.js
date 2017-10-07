import callApi, {callApiWithFiles} from '../../../../util/apiCaller';


export function getCategories(assignmentData){

}



export function submitForm(formData, course) {
	var problems = [];
	var data;
	data = new FormData();
	// console.log(course);
	data.append("assignment_num", formData.name);
	// data.append("tar", document.getElementById("tar").files[0], "tarball.tar");
	// data.append("make", document.getElementById("make").files[0], "makefile");
	data.append("category", formData.category);
	data.append("name", formData.displayName);
	data.append("section_based",false);
	data.append("auto_grader",true);
	var prob = [];
	prob[0] = formData.p_name;
	prob[1] =  parseInt(formData.max_score);
	problems[0] = prob;
	data.append("problems", JSON.stringify([{problem_name:formData.p_name, score : parseInt(formData.max_score) }]));


  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApiWithFiles("courses/" + course + "/assignments/create", data)
      .then(data => {
        console.log(data);
      })
  }
}