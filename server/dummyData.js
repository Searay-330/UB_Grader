import Course from './models/Course.js';
import User from './models/User.js';
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
                        section_based:      false, 
                        start_date:         new Date('<2017-09-20>'), 
                        due_date:           new Date('<2017-09-30>'), 
                        end_date:           new Date('<2017-10-01>'), 
                        description:        'Must have your prototype up and running!',                              auto_grader:        true,   
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
                                    assignments:    assignment1 
                                });


    Course.create(course_cse442, (error) => {
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
                            person_number:  '11223344', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
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
                                        course_role:    'Student',
                                        section_id:     section1_id                              
                                    } 
                         });

    const user3 = new User({
                            first_name:     'Dhruv', 
                            last_name:      'Kumar', 
                            email:          'dkumar2@buffalo.edu', 
                            person_number:  '12345677', 
                            updated_at:      new Date(),
                            courses: {
                                        course_id:      course_cse442._id,
                                        course_role:    'Student',
                                        section_id:     section1_id                                 
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

});

}