/**
 * Get user that is currently logged in
 * @param req
 * @param res
 * @returns void
 */
export function getCurrentUser(req,res) {
	if((req.user === undefined)){

		res.send({first_name:""});
	}else{

    res.send(req.user);
	}
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