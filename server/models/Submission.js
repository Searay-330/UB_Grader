import mongoose from 'mongoose';
import User from './User.js'
import Course from './Course.js'
const Schema = mongoose.Schema;


const submssions_scoreSchema = new Schema({

    _id:                        false,
    problem_name:               { type: String, required: true },
    score:                      { type: Number, required: true },

});

const submissionSchema = new Schema({
    
        user_id:                    { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        timestamp :                 { type : Date, default: Date.now },
        user_email:                 { type: String, required: true},   
        course_id:                  { type: Schema.Types.ObjectId, ref: 'Courses'},
        course_num:                 { type: String, required: true },
        assignment_id:              { type: Schema.Types.ObjectId, ref: 'Courses.assignments' },
        assignment_num:             { type: String, required: true },
        version:                    { type: Number, required: true },
        file_name:                  { type: String, required: true },
        grader:                     { type: String, required: true },
        form_data:                  { type: String, required: true },
        scores:                     [submssions_scoreSchema],
        feedback:                   { type: String, required: true },
        
});


export default mongoose.model('Submissions', submissionSchema);
    
