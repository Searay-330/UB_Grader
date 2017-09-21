import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const course_sectionSchema = new Schema({

    name:                       { type: String, required: true },
    start_date:                 { type: Date },
    due_date:                   { type: Date },
    end_date:                   { type: Date },
    recurrence:                 { type: String }

});

const course_assignments_section_due_dateSchema = new Schema({
    
    _id:                        false,
    section_id:                 { type: Schema.Types.ObjectId, ref: 'Courses.sections', required: true },
    start_date:                 { type: Date, required: true },
    due_date:                   { type: Date, required: true },
    end_date:                   { type: Date, required: true },

});

const course_assignments_problemSchema = new Schema({

    problem_name:               { type: String, required: true },
    score:                      { type: Number, required: true },

});

const course_assignmentSchema = new Schema({

    category:                   { type: String, required: true },
    name:                       { type: String, required: true },
    section_based:              { type: Boolean, required: true, default: true },
    section_due_dates:          [course_assignments_section_due_dateSchema], 
    start_date:                 { type: Date },
    due_date:                   { type: Date },
    end_date:                   { type: Date },
    description:                { type: String },
    auto_grader:                { type: Boolean, required: true },                                     
                            
    form:                       {
                                    file:               { type: Boolean },
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
    problems:                   [course_assignments_problemSchema],             
    late_penalty:               { type: Number },
    max_over_latest:            { type:Boolean, default: true },

});


const courseSchema = new Schema({
    
    course_num:                 { type: String, required: true, unique: true },
    display_name:               { type: String, required: true },
    semester:                   { type: String, required: true },
    sections:                   [course_sectionSchema],
    assignments:                [course_assignmentSchema], 

});

export default mongoose.model('Courses', courseSchema);
