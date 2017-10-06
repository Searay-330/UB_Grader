import Course from '../models/Course'
/**
 * Creates a new assignment.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the created course.
 */

export function createAssignment(req, res){
            
    Course.findOne({'course_num': req.params.course_num}, (err, courseobj) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            var start_date = Date.now();
            var end_date = start_date;
            var due_date = start_date;
            if (req.body.start_date) {
                start_date = req.body.start_date;
            }
            if (req.body.end_date) {
                end_date = req.body.end_date;
            }
            if (req.body.due_date) {
                due_date = req.body.due_date;
            }
            var assignment = {
                category: req.body.category,
                name: req.body.name,
                assignment_num: req.body.assignment_num,
                section_based: req.body.section_based,
                auto_grader: req.body.auto_grader,
                start_date: start_date,
                end_date: end_date,
                due_date: due_date
            }
            courseobj.assignments.push(assignment);
            courseobj.save((err, updatedcourseobj) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(updatedcourseobj);
            });
        }
    });
}


/**
 * Updates an existing assignment.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated course.
 */
export function updateAssignment(req, res){
    
        Course.findOne({ 'course_num': req.params.course_num }, (err,courseobj) =>{
            if (err){
                res.status(500).send(err);
            }  
            else {
                var isAssignment = false;
                courseobj.assignments.forEach((assignment) => {
                    if(assignment.assignment_num == req.params.assignment_num){
                        for (var key in req.body) {
                            if (req.body.hasOwnProperty(key)) {
                              var item = req.body[key];
                              assignment.set(key, req.body[key]);
                            }
                        }
                        courseobj.save((err, updatedcourseobj) => {
                            if (err) res.status(500).send(err);
                            else res.status(200).send(updatedcourseobj);
                        });
                    }
                });
                
            }
        });
    
    }