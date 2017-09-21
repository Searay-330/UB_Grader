export function isAuthenticated(req,res,next){
    if (req.user) return next();
    res.redirect('/');
}

export function getAccessLevel(req,res){
    return req.user.sys_role;
}