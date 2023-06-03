import { Router } from 'express';
import { UserService } from '../services/index.js';
import socketConnection from '../socket/socket-connection.js';

const router = Router();

router.use((req, res, next) => {
	if (!req.isAuthenticated()) return res.redirect('/api/v1/auth/error');
	return next();
});

router.get('/', async (req, res) => {
	const { user } = req;
	const { friends } = await UserService.getFriends(user._id);
	const promises = friends.map(async (user) => {
		return await UserService.getUserById(user);
	});
	const result = await Promise.all(promises);
	// socketConnection().emit('friend-list:add', 'hello, friend datasını çekiyorsun');
	res.json(result);
});
router.post('/add', async (req, res) => {
	try {
		const { friendName } = req.body;
		const { username } = req.user;
		if (friendName === username) throw { status: 400, message: 'You cannot add yourself' };
		const data = await UserService.addFriend(username, friendName);
		socketConnection().emit('friend-list:add', data);
		res.json(data);
	} catch (error) {
		res.status(error.status).json({ error });
	}
});

export default router;
