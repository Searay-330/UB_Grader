// Initial State
const initialState = {
  dueDate:"June 9th 1917, 4:20pm",
  //score:0,
  scoreTotal:100,
  feedback:"Autograder [Wed Sep 20 17:52:18 2017]: Received job cse115-f17_ratingsandreviewspart1_7_rshanule@buffalo.edu:772\r\nAutograder [Wed Sep 20 17:52:28 2017]: Success: Autodriver returned normally\nAutograder [Wed Sep 20 17:52:28 2017]: Here is the output from the autograder:\n---\nAutodriver: Job exited with status 0\n\n-- averageRating --\n* Correct on all inputs *\nScore: 1\n\n-- starRating --\n* Correct on all inputs *\nScore: 1\n\n-- updateAverage --\n* Correct on all inputs *\nScore: 1\n\n-- bayesianAverage --\n* Correct on all inputs *\nScore: 1\n\n{\"scores\": {\"averageRating\":1,\"starRating\":1,\"updateAverage\":1,\"bayesianAverage\":1}}\n\nScore for this problem: 1.0",
};

const AssignmentReducer = (state = initialState, action) => {
  switch (action.type) {

    default:
      return state;

    }
};

// Export Reducer
export default AssignmentReducer;
