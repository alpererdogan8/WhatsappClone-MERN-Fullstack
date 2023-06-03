import express from 'express';
import { ChatService } from '../services/index.js';

const router = express.Router();
router.use((req, res, next) => {
	if (!req.isAuthenticated()) return res.redirect('/api/v1/auth/error');
	return next();
});

router.post('/create', async (req, res) => {
	const { friendId } = req.body;
	const { user } = req;
	const result = await ChatService.createChat({ userId: user._id, friendId });
	res.json(result);
});
router.get('/', async (req, res) => {
	const chatList = await ChatService.getChatList();
	res.json(chatList);
});
router.get('/:userId/list', async (req, res) => {
	try {
		const { userId } = req.params;
		const chat = await ChatService.getUserChatList(userId);
		res.json(chat);
	} catch (error) {
		res.status(404).json(error.message);
	}
});

export default router;
