import Course from '../models/Course'
/**
 * Creates a new assignment.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the created assignment.
 */

export function createAssignment(req, res) {
            
    Course.findOne({ 'course_num': req.params.course_num }, (err, courseobj) => {
        if (err) {
            return res.status(500).send(err);
        }
        var duplicate = courseobj.assignments.id(req.body.id);
        if (duplicate) {
            return res.status(200).send({ Status: 200, Message: 'Assignment Name is not unique!' });         
        }
        var problems = [];
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
        if (req.body.problems) {
            problems = JSON.parse(req.body.problems);
        }
        var assignment = {
            _id: req.body.id,
            category: req.body.category,
            name: req.body.name,
            section_based: req.body.section_based,
            auto_grader: req.body.auto_grader,
            start_date: start_date,
            end_date: end_date,
            due_date: due_date,
            problems: problems
        }
        courseobj.assignments.push(assignment);
        courseobj.save((err, updatedcourseobj) => {
            if (err) res.status(500).send(err);
            else res.status(200).send(assignment);
        });
    });
}


/**
 * Updates an existing assignment.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated assignment.
 */
export function updateAssignment(req, res){    
        Course.findOne({ 'course_num': req.params.course_num }, (err,courseobj) =>{
            if (err){
                return res.status(500).send(err);
            }  
            var assignment = courseobj.assignments.id(req.params.id);
            if (!assignment) {
                return res.status(404).send({ Status: 404, Message: 'Assignment does not exist!' });
            }
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    var item = req.body[key];
                    assignment.set(key, req.body[key]);
                }
            }
            courseobj.save((err, updatedcourseobj) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(assignment);
            });
        });
}

/**
 * Delete an existing assignment.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated list of assignments.
 */
export function deleteAssignment(req, res){

        Course.findOne({ 'course_num': req.params.course_num }, (err,courseobj) =>{
            if (err){
                return res.status(500).send(err);
            }  
            var assignment = courseobj.assignments.id(req.params.id);
            if (!assignment) {
                return res.status(404).send({ Status: 404, Message: 'Assignment does not exist!' });
            }
            assignment.remove();
            courseobj.save((err, updatedcourseobj) => {
                if (err) res.status(500).send(err);
                else res.status(200).send({ Status: 200, Message: 'Assignment has successfully been deleted.' });
            });
        });
}