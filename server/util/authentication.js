export function isAuthenticated(req, res, next){
    if (req.user) return next();
    else res.status(401).send({status: 401, message: 'Sorry, you must be logged in to view this page'});
}

export function isAdmin(req, res, next){
    if (req.user.sys_role == 'admin') return next();
    else res.status(403).send({status: 403, message: 'Sorry, you are not authorized to view this page'});
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
    res.status(403).send({status: 403, message: 'Sorry, you are not authorized to view this page'});
}