import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../database/model/users.js';

// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
export default passport;
