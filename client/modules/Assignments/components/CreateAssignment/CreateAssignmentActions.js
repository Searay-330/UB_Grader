import callApi, {add,callApiWithFiles} from '../../../../util/apiCaller';


export function getCategories(assignmentData){

}



export function submitForm(formData, course) {
	
	var data;
	data = new FormData();
	// console.log(course);
	data.append("assignment_num", formData.name);
	data.append("tar", document.getElementById("tar").files[0], "tarball.tar");
	data.append("make", document.getElementById("make").files[0], "makefile");
	data.append("category", formData.category);
	data.append("name", formData.displayName);
	data.append("section_based",false);
	data.append("auto_grader",true);
	//data.append("problems", [{problem_name: formData.p_name, score:formData.max_score}]);


  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
	console.log(add());
    return callApiWithFiles("courses/" + course + "/assignments/create", data)
      .then(data => {
        console.log(data);
      })
  }
}