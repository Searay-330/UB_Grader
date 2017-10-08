import callApi from '../../util/apiCaller';

export function populateCourseData(data){	
  return {type:"populate", assignmentsData: data, assignmentsMap: mapping(data)};
}

function mapping(data){
	var map = [];
	for(var i = 0; i< data.length; ++i){
  		map[data[i].name] = data[i];
  	}
  	return map;
}


export function getCourseData(course_num) {
  console.log("hasdasd");
  return function (dispatch) {
    dispatch(() => {return {type:"wait"};});
    return callApi("courses/" + course_num + "/assignments","get")
      .then(data => {
        dispatch(populateCourseData(data))
      })
  }
}