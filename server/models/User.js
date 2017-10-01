import mongoose from 'mongoose';
import Course from './Course.js'
const Schema = mongoose.Schema;

const user_course_assignmentsSchema = new Schema({

    assignment_id:              { type: Schema.Types.ObjectId, ref: 'Courses.assignments' },
    start_date:                 { type: Date, required: true },
    due_date:                   { type: Date, required: true },
    end_date:                   { type: Date, required: true },

});

const user_courseSchema = new Schema({

    _id:                        false,
    course_id:                  { type: Schema.Types.ObjectId, ref: 'Courses', required: true, unique: true},
    course_num:                 { type: String, required: true, unique: true },    
    course_role:                { type: String, default: 'Student', required: true },
    section_id:                 { type: Schema.Types.ObjectId, ref: 'Courses.sections', unique: true},
    section_name:               { type: String, unique: true }, 
    assignments:                [user_course_assignmentsSchema]

});

const userSchema = new Schema({

    first_name:                 { type: String, required: true },
    last_name:                  { type: String, required: true },
    email:                      { type: String, required: true, unique: true },
    person_number:              { type: String, unique: true },
    sys_role:                   { type: String },
    created_at:                 { type: Date, default: Date.now, required: true },
    updated_at:                 { type: Date },
    courses:                    [user_courseSchema],
    google_id:                  { type: String }

});

export default mongoose.model('Users', userSchema);
