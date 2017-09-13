import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({

    first_name:                 { type: String, required: true },
    last_name:                  { type: String, required: true },
    email:                      { type: String, required: true, unique: true },
    person_number:              { type: String, unique: true },
    sys_role:                   { type: String },
    created_at:                 { type: Date, default: Date.now, required: true },
    updated_at:                 { type: Date },

    courses:                    [{
                                    _id:                false,
                                    course_id:          { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
                                    course_role:        { type: String, default: 'Student', required: true },
                                    section_id:         { type: Schema.Types.ObjectId, ref: 'Courses.sections' },
                                }],

});


const courseSchema = new Schema({
    
    course_num:                 { type: String, required: true, unique: true },
    display_name:               { type: String, required: true },
    semester:                   { type: String, required: true },

    sections:                   [{ 
                                    name:               { type: String, required: true },
                                    start_date:         { type: Date },
                                    due_date:           { type: Date },
                                    end_date:           { type: Date },
                                }],

    assignments:                [{
                                    category:           { type: String, required: true },
                                    name:               { type: String, required: true },
                                    start_date:         { type: Date, required: true },
                                    due_date:           { type: Date, required: true },
                                    end_date:           { type: Date, required: true },
                                    section_based:      { type: Boolean, required: true },
                                    description:        { type: String },
                                    auto_grader:        { type: Boolean, required: true },                                     
                                                            
                                    form:               {
                                                            file:               { type: Boolean, required: true },
                                                            file_name:          { type: String },
                                                            form_name:          { type: String },
                                                            text_fields:        { type: [String] },

                                                            dropdown: [{
                                                                            _id:            false,
                                                                            name:           { type: String, required: true },
                                                                            options:        { type: [String], required: true },
                                                                      }],

                                                            checklist: [{
                                                                            _id:                    false,
                                                                            name:                   { type: String, required: true },
                                                                            select_multiple:        { type: Boolean },
                                                                            options:                { type: [String], required: true }
                                                                        }],
                                                        },
                                                            
                                    problems:           [{
                                                            problem_name:       { type: String, required: true },
                                                            score:              { type: Number, required: true },
                                                        }],
                                                            
                                    late_penalty:       { type: Number },
                                    max_over_latest:    { type:Boolean, default: true },

                                }], 

});


const submissionSchema = new Schema({

    user_id:                    { type: Schema.Types.ObjectId, ref: 'Users', required: true },   
    course_id:                  { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
    assignment_id:              { type: Schema.Types.ObjectId, ref: 'Courses.assignments', required: true },            
    version:                    { type: Number, required: true },
    file_name:                  { type: String, required: true },
    grader:                     { type: String, required: true },
    form_data:                  { type: String, required: true },

    scores:                     [{
                                     _id:            false,
                                     problem_id:     { type: Schema.Types.ObjectId, ref: 'Courses.assignments.problems', required: true },
                                     score:          { type: Number, required: true },
                                }],

    feedback:                   { type: String, required: true },
    
});


var User = mongoose.model('Users', userSchema);

var Course = mongoose.model('Courses', courseSchema);

var Submission = mongoose.model('Submissions', submissionSchema);

module.exports = {
    User: User,
    Submission: Submission,
    Course: Course,
};
