import mongoose from 'mongoose';
const Schema = mongoose.Schema;
require('mongoose-type-email');

const userSchema = new Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    person_number: { type: String },
    major: { type: String },
    graduation_year: { type: String },
    admin: { type: Boolean },
    last_ip: { type: String },
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date },
    courses: [{
    _id: false,
    course_id: { type: Schema.Types.ObjectId, ref: 'Courses' },
    instructor: { type: Boolean },
    section_id: { type: Schema.Types.ObjectId, ref: 'Courses.sections' },
    }],

});

const courseSchema = new Schema({
    
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    semester: { type: String, required: true },
    sections: [{ 
         name: { type: String, required: true },
         start_date: { type: Date },
         due_date: { type: Date },
         end_date: { type: Date },
    }],
    assignments_by_category:[{ 
        category: { type: String, required: true },
        assignments: [{
            name: { type: String, required: true },
            start_date: { type: Date, required: true },
            due_date: { type: Date, required: true },
            end_date: { type: Date, required: true },
            section_based: { type: Boolean, required: true },
            description: { type: String },
            auto_grader: { type: Boolean, required: true },
            form: {
                file: { type: Boolean, required: true },
                file_name: { type: String },
                form_name: { type: String },
                text_fields: { type: [String] },
                dropdown: [{
                    _id: false,
                    name: { type: String, required: true },
                    options: { type: [String], required: true },
                }],
                checklist: [{
                    _id: false,
                    name: { type: String, required: true },
                    select_multiple: { type: Boolean },
                    options: { type: [String], required: true }
                },],
            },
            problems: [{
                // required: true,
                problem_name: { type: String, required: true },
                score: { type: Number, required: true },
            }],
            late_penalty: { type: Number },
            max_over_latest: { type:Boolean },
        }],
   }],

});


const submissionSchema = new Schema({

        user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },    
        course_id: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
        version: { type: Number, required: true },
        assignment_id: { type: Schema.Types.ObjectId, ref: 'Courses.assignments_by_category.assignments', required: true },
        file_name: { type: String, required: true },
        grader: { type: String, required: true },
        form_data: { type: String, required: true },
        scores: [{
        _id: false,
        problem_id: { type: Schema.Types.ObjectId, ref: 'Courses.assignments_by_category.assignments.problems', required: true },
        score: { type: Number, required: true },
        }],
        feedback: { type:String, required: true },
    
});


var User = mongoose.model('Users', userSchema);

var Course = mongoose.model('Courses', courseSchema);

var Submission = mongoose.model('Submissions', submissionSchema);

module.exports = {
    User: User,
    Submission: Submission,
    Course: Course,
};
