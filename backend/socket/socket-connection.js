import { Server } from 'socket.io';
import { MessageService, UserService } from '../services/index.js';
let socketServer = null;

export default function (server) {
	if (socketServer) return socketServer;

	socketServer = new Server(server, {
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});

	socketServer.on('connection', (socket) => {
		socket.on('authentication_server', async (userId) => {
			const isAuthUser = await UserService.getUserById(userId);
			if (typeof isAuthUser?._id === 'undefined') {
				socket.disconnect();
			}
		});

		socket.on('join-room', (roomId) => {
			socket.join(roomId);
		});
		socket.on('leave-room', (roomId) => {
			socket.leave(roomId);
		});
		socket.on('deneme', (data) => {
			console.log(data);
		});
		socket.on('send-message', async (msg) => {
			const { chatId, senderId, message } = msg;

			if (!chatId || !senderId || !message) throw new Error('Message failed to send');
			const socketMessage = await MessageService.createMessage({ chatId: chatId, sender: senderId, message });
			socketServer.to(chatId).emit('private-room', socketMessage);
		});
	});
	return socketServer;
}
