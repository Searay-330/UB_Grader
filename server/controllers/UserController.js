import User from '../models/User'
/**
 * Get user that is currently logged in
 * @param req
 * @param res
 * @returns void
 */
export function getCurrentUser(req,res) {
    res.send(req.user);
}

/**
 * Logs out user that is currently logged in back to the homepage
 * @param req
 * @param res
 * @returns void
 */
export function logoutUser(req,res) {
    req.logout();
    res.redirect('/');
}

/**
 * Redirects user back to homepage upon successfully being authenticated by Google OAuth
 * @param req
 * @param res
 * @returns void
 */
export function loginRedirect(req,res) {
    res.redirect('/courses');
}


/**
 * Returns information about a specific user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req,res) {
    User.findById(req.params.user_id, (err, user) => {
        if (err) res.status(500).send(err);            
        res.send(user);        
    });
}