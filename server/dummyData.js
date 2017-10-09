import Course from './models/Course.js';
import User from './models/User.js';
import Submission from './models/Submission.js'
import mongoose from 'mongoose';


export default function () {

Course.count().exec((err, count) => {

    if (count > 0) {
          return;
    }
    
    const course_testcourse = new Course({
                                    course_num:     'testcourse-f17', 
                                    display_name:   'Test Course 101', 
                                    semester:       'Fall 2017', 
                                });

    Course.create([course_testcourse], (error) => {
        if (!error) {
            // console.log('ready to go....');
        }
        else {
            console.log(error);
        }
    });
        
    const user1 = new User({
                            first_name:     'Aamel', 
                            last_name:      'Unia', 
                            email:          'aameluni@buffalo.edu', 
                            sys_role:       'admin',
                            person_number:  '11223344', 
                            updated_at:      new Date(),
                        });

    const user2 = new User({
                            first_name:     'Adhish', 
                            last_name:      'Chugh', 
                            email:          'adhishch@buffalo.edu', 
                            sys_role:       'admin',
                            person_number:  '12345679', 
                            updated_at:      new Date(),
                         });

    const user3 = new User({
                            first_name:     'Dhruv', 
                            last_name:      'Kumar',
                            sys_role:       'admin', 
                            email:          'dkumar2@buffalo.edu', 
                            person_number:  '12345677', 
                            updated_at:      new Date(),
                        });

    const user4 = new User({
                            first_name:     'Richard', 
                            last_name:      'Hanulewicz', 
                            email:          'rshanule@buffalo.edu', 
                            person_number:  '12346789', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_testcourse._id,
                                        course_num:     'testcourse-f17',                                         
                                        course_role:    'student',
                                    } 
                        });

    const user5 = new User({
                            first_name:     'David', 
                            last_name:      'Schuster', 
                            email:          'deschust@buffalo.edu', 
                            person_number:  '87654321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_testcourse._id,
                                        course_num:     'testcourse-f17',                                         
                                        course_role:    'student',
                                    } 
                        });
    
    const user6 = new User({
                            first_name:     'Kevin', 
                            last_name:      'Rathbun', 
                            email:          'kevinrat@buffalo.edu', 
                            person_number:  '97654321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_testcourse._id,
                                        course_num:     'testcourse-f17',                                         
                                        course_role:    'student',
                                    } 
                        });
    
                            
    const user7 = new User({
                            first_name:     'Student', 
                            last_name:      'One', 
                            email:          'studentone.442@gmail.com', 
                            person_number:  '90650321', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_testcourse._id,
                                        course_num:     'testcourse-f17',                                         
                                        course_role:    'Student',
                                    } 
                        });

    const user8 = new User({
                            first_name:     'Teacher', 
                            last_name:      'One', 
                            email:          'teacherone.442@gmail.com', 
                            person_number:  '90600393', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_testcourse._id,
                                        course_num:     'testcourse-f17',                                         
                                        course_role:    'instructor',
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
});

}
