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
course_id: { type: Schema.Types.ObjectId, ref: Courses },
instructor: { type: Boolean },
section_id: { type: Schema.Types.ObjectId, ref: Courses.sections },
}],

});

export default mongoose.model('Users', userSchema);
