import { Router } from 'express';
import * as AuthController from '../controllers/authentication'
const router = new Router();
const passport = require('passport');

//Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
	})
);

//Redirects user upon successful Google OAuth Login
router.get('/auth/google/callback', passport.authenticate('google'),AuthController.loginRedirect);

//Sends back the user that is currently logged in.
router.get('/current_user', 		AuthController.getCurrentUser);

//Logs out user
router.get('/logout',				AuthController.logoutUser);


export default router;
