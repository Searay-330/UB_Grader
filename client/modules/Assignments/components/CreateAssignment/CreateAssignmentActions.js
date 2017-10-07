import callApi, {callApiWithFiles} from '../../../../util/apiCaller';


export function getCategories(assignmentData){

}



export function submitForm(formData, course) {
	var hold;
	var data;
	data = new FormData();
	data.append("assignment_num", formData.name);
	hold = (document.getElementById("tar"))?data.append("tar", document.getElementById("tar").files[0], "tarball.tar"): null;
	hold = (document.getElementById("make"))?data.append("make", document.getElementById("make").files[0], "makefile"): null;
	data.append("category", formData.category);
	data.append("name", formData.displayName);
	data.append("section_based",false);
	data.append("auto_grader",true);
	data.append("problems", JSON.stringify([{problem_name:formData.p_name, score : parseInt(formData.max_score) }]));


  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApiWithFiles("courses/" + course + "/assignments/create", data)
      .then(data => {
        console.log(data);
      })
  }
}