import message from '../database/model/message.js';
import BaseService from './BaseService.js';
import ChatService from './ChatService.js';

class MessageService extends BaseService {
	async createMessage({ chatId, sender, message }) {
		const newMessage = await this.insert({ chatId, sender, message });
		const chat = await ChatService.getUserOneChat(chatId);
		await ChatService.updateChat(chat._id, { messages: [...chat.messages, newMessage] });

		return newMessage;
	}
	async getAllMessages() {
		return await this.load();
	}
	async getMessageById(id) {
		return await this.find(id);
	}
	async deleteMessage(id) {
		return await this.delete(id);
	}
}

export default new MessageService(message);
