import Course from './models/Course.js';
import User from './models/User.js';
import Submission from './models/Submission.js'
import mongoose from 'mongoose';


export default function () {

Course.count().exec((err, count) => {

    if (count > 0) {
          return;
    }

    const assignment1 = {
                        _id:                new mongoose.Types.ObjectId(),
                        category:           'Phase 1', 
                        name:               'Create Prototype',
                        assignment_num:     'assignment1-cse442-f17',
                        // user_submissions:   [temp1, temp2, temp3],
                        display_name:       'Create Prototype',
                        section_based:      false, 
                        start_date:         new Date('<2017-09-20>'), 
                        due_date:           new Date('<2017-09-30>'), 
                        end_date:           new Date('<2017-10-01>'), 
                        description:        'Must have your prototype up and running!',                              
                        auto_grader:        true,   
                        late_penalty:       20,
                    };

    const assignment2 = {
                        _id:                new mongoose.Types.ObjectId(),
                        category:           'Phase 2', 
                        name:               'Create MVP',
                        assignment_num:     'assignment2-cse442-f17',
                        // user_submissions:   [temp1, temp2, temp3],
                        display_name:       'Create MVP',
                        section_based:      false, 
                        start_date:         new Date('<2017-09-30>'), 
                        due_date:           new Date('<2017-10-20>'), 
                        end_date:           new Date('<2017-10-30>'), 
                        description:        'Must have your MVP up and running!',                              
                        auto_grader:        true,   
                        late_penalty:       20,
                    };

    const section1 = {
                        _id:                new mongoose.Types.ObjectId(),
                        name:               'Backend',
                        start_date:         new Date('<2017-09-18>'), 
                        due_date:           new Date('<2017-09-24>'), 
                        end_date:           new Date('<2017-09-25>'),
                        recurrence:         'Weekly'   
                    };

    const section2 = {
                        _id:                new mongoose.Types.ObjectId(),
                        name:               'Frontend',
                        start_date:         new Date('<2017-09-15>'), 
                        due_date:           new Date('<2017-09-21>'), 
                        end_date:           new Date('<2017-10-22>'),
                        recurrence:         'Weekly'                           
                    };

    const course_cse442 = new Course({
                                    course_num:     'cse442-f17', 
                                    display_name:   'CSE 442', 
                                    semester:       'Fall 2017', 
                                    sections:       [ section1, section2 ],
                                    assignments:    [assignment1,assignment2] 
                                });
    
    const course_cse331 = new Course({
                                    course_num:     'cse331-f17', 
                                    display_name:   'CSE 331', 
                                    semester:       'Fall 2017', 
                                });


    Course.create([course_cse442, course_cse331], (error) => {
        if (!error) {
            // console.log('ready to go....');
        }
        else {
            console.log(error);
        }
    });


    const section1_id = section1._id;

    const section2_id = section2._id;
    
    
    const user1 = new User({
                            first_name:     'Aamel', 
                            last_name:      'Unia', 
                            email:          'aameluni@buffalo.edu', 
                            sys_role:       'admin',
                            person_number:  '11223344', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section1_id
                                    } 
                        });

    const user2 = new User({
                            first_name:     'Adhish', 
                            last_name:      'Chugh', 
                            email:          'adhishch@buffalo.edu', 
                            person_number:  '12345679', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section1_id                              
                                    } 
                         });

    const user3 = new User({
                            first_name:     'Dhruv', 
                            last_name:      'Kumar',
                            sys_role:       'admin', 
                            email:          'dkumar2@buffalo.edu', 
                            person_number:  '12345677', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section1_id,
                                    } 
                        });

    const user4 = new User({
                            first_name:     'Richard', 
                            last_name:      'Hanulewicz', 
                            email:          'rshanule@buffalo.edu', 
                            person_number:  '12346789', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section2_id                                 
                                    } 
                        });

    const user5 = new User({
                            first_name:     'David', 
                            last_name:      'Schuster', 
                            email:          'deschust@buffalo.edu', 
                            person_number:  '87654321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section2_id
                                    } 
                        });
    
    const user6 = new User({
                            first_name:     'Kevin', 
                            last_name:      'Rathbun', 
                            email:          'kevinrat@buffalo.edu', 
                            person_number:  '97654321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section2_id                                        
                                    } 
                        });
    
                            
    const user7 = new User({
                            first_name:     'Student', 
                            last_name:      'One', 
                            email:          'studentone.442@gmail.com', 
                            person_number:  '90650321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Student',
                                        section_id:     section2_id                                        
                                    } 
                        });

    const user8 = new User({
                            first_name:     'Teacher', 
                            last_name:      'One', 
                            email:          'teacherone.442@gmail.com', 
                            person_number:  '90600393', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_num:     'cse442-f17',                                         
                                        course_role:    'Teacher',
                                    } 
                        });


    User.create([user1,user2,user3,user4,user5,user6,user7,user8], (error) => {
        if (!error) {
            // console.log('ready to go....');
        }
        else{
            console.log(error);
        }
    });
    
   const sampleSubmission1 = new Submission({
                                       user_id:        user6.id,
                                       user_email:     user6.email,
                                       course_id:      course_cse442._id,
                                       assignment_id:  assignment1._id,
                                       course_num:     course_cse442.course_num,            
                                       assignment_num: assignment1.assignment_num,
                                       version:        1,
                                       feedback:       "This is a submission for CSE442 assignment 1"
                                       });
   
   const sampleSubmission2 = new Submission({
                                       user_id:        user6.id,
                                       user_email:     user6.email,
                                       course_id:      course_cse442._id,
                                       assignment_id:  assignment1._id,
                                       course_num:     course_cse442.course_num,            
                                       assignment_num: assignment1.assignment_num,
                                       version:        2, 
                                       feedback:       "This is a submission for CSE442 assignment 1"
                                       });
   
   const sampleSubmission3 = new Submission({
                                       user_id:        user6.id,
                                       user_email:     user6.email,
                                       course_id:      course_cse442._id,
                                       assignment_id:  assignment2._id,
                                       course_num:     course_cse442.course_num,            
                                       assignment_num: assignment2.assignment_num,
                                       version:        1,
                                       feedback:       "This is a submission for CSE442 assignment 2"
                                       });
    
    const sampleSubmission4 = new Submission({
                                        user_id:        user6.id,
                                        user_email:     user6.email,
                                        course_id:      course_cse442._id,
                                        assignment_id:  assignment2._id,
                                        course_num:     course_cse442.course_num,            
                                        assignment_num: assignment2.assignment_num,
                                        version:        -1,
                                        file_name:      "placeholder",
                                        grader:         "placeholder",
                                        form_data:      "placeholder",
                                        feedback:       "This is a submission for CSE442 assignment 2 user 7"
                                        });
    
    const sampleSubmission5 = new Submission({
                                        user_id:        user6.id,
                                        course_id:      course_cse442._id,
                                        user_email:     user6.email,
                                        assignment_id:  assignment1._id,
                                        course_num:     course_cse442.course_num,            
                                        assignment_num: assignment1.assignment_num,
                                        version:        -1,
                                        file_name:      "placeholder",
                                        grader:         "placeholder",
                                        form_data:      "placeholder",
                                        feedback:       "This is a submission for CSE442 assignment 1 user 7"
                                        });
    
    Submission.create([sampleSubmission4,sampleSubmission5], (error) => {
        if (!error) {
            console.log('ready to go....');
        }
        else {
            console.log(error);
        }
    });

});

}