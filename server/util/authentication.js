export function isAuthenticated(req,res,next){
    if (req.user) return next();
    res.redirect('/');
}

export function getAccessLevel(req,res){
    return req.user.sys_role;
}

export function isInstructor(req, res, next){
    if (req.user.sys_role == 'admin') return next();
    var courses = req.user.courses;
    for (var i = 0; i < courses.length; i++){
        if (courses[i].course_id == req.params.course_id){
            if (courses[i].course_role == 'Teacher'){
                return next();
            }
        }
    }
    res.redirect('/');    
}