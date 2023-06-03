import express from 'express';
import AuthService from '../services/AuthService.js';
import UserService from '../services/UserService.js';
const router = express.Router();
const isAuth = (req, res, next) => {
	if (!req.isAuthenticated()) return res.redirect('/api/v1/auth/error');
	return next();
};

router.get('/user-data', isAuth, async (req, res) => {
	try {
		const { _id } = req.user;
		const userInfo = await UserService.getUserById(_id);
		res.status(200).json(userInfo);
	} catch (error) {
		res.redirect('/error');
	}
});
router.get('/error', function (req, res) {
	res.status(401).json('User not authenticated.');
});
router.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body;
		const result = await AuthService.register(username, password);
		res.status(201).json(result);
	} catch (error) {
		res.status(409).json(error.message);
	}
});
router.post('/login', AuthService.login(), (req, res) => {
	try {
		res.redirect('/api/v1/auth/user-data');
	} catch (error) {
		res.redirect('/error');
	}
});

router.post('/logout', (req, res, next) => {
	try {
		req.logout(() => {
			res.status(204).json({});
		});
	} catch (error) {
		next(error);
	}
});

export default router;
