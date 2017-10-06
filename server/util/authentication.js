export function isAuthenticated(req, res, next){
    if (req.user) return next();
    res.redirect('/');
}

export function isAdmin(req, res, next){
    if (req.user.sys_role == 'admin') return next();
    res.redirect('/');
}

export function isInstructor(req, res, next){
    if (req.user.sys_role == 'admin') return next();
    var courses = req.user.courses;
    for (var i = 0; i < courses.length; i++){
        if (courses[i].course_num == req.params.course_num){
            if (courses[i].course_role == 'instructor'){
                return next();
            }
        }
    }
    res.redirect('/');    
}

export function isInstructorOrUser(req, res, next){
    if (req.user.sys_role == 'admin') return next();
    var courses = req.user.courses;
    var email = req.user.email;
    for (var i = 0; i < courses.length; i++){
        if (courses[i].course_num == req.params.course_num){
            if (courses[i].course_role == 'instructor' || (courses[i].course_role == 'Student' && req.params.email == email)){
                return next();
            }
        }
    }
    res.redirect('/');    
}