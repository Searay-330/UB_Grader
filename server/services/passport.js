const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
import User from '../models/User'


passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/api/auth/google/callback'
    }, (accessToken,refreshToken,profile,done) => {
        User.findOne({ email: profile.emails[0].value }).then(existingUser =>{
            if (existingUser) {
                if (!existingUser.first_name || !existingUser.last_name){
                    existingUser.first_name = profile.name.givenName;
                    existingUser.last_name = profile.name.familyName;
                    existingUser.save().then(user => done(null, user));
                }
                else{
                    done(null, existingUser);
                }
 
            }
            else{
                new User({email: profile.emails[0].value, first_name: profile.name.givenName, last_name: profile.name.familyName})
                .save()
                .then(user => done(null, user));
            }
        });
    })
);