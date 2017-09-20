import { Router } from 'express';
const router = new Router();
const passport = require('passport');

router.get(
	'/auth/google',
	passport.authenticate('google', {
	scope: ['profile', 'email']
	})
);

router.get('/auth/google/callback', passport.authenticate('google'));

export default router;
