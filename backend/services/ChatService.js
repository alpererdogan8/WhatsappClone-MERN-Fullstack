import BaseService from './BaseService.js';
import Chat from '../database/model/chat.js';
import UserService from './UserService.js';

class ChatService extends BaseService {
	async createChat(users) {
		const { userId, friendId } = users;
		// Get current user and friend
		const currentUser = await UserService.getUserById(userId);
		const currentFriend = await UserService.getUserById(friendId);
		// Check if user is friend
		const isFriend = currentUser.friends.includes(friendId);

		if (!isFriend) return { message: 'Not a friend in your contact list' };

		// Check if chat exists between current user and current friend
		const currentUserChatIds = currentUser.chat.map((chatItem) => chatItem.toString());
		const currentFriendChatIds = currentFriend.chat.map((chatItem) => chatItem.toString());
		const commonChatIds = currentUserChatIds.filter((chatId) => currentFriendChatIds.includes(chatId));
		if (commonChatIds.length > 0) {
			return await this.getUserOneChat(commonChatIds[0]);
		}

		// Create chat
		const participants = [currentUser._id, currentFriend._id];
		const newChat = await this.insert({ users: participants });

		await UserService.updateUser(currentUser._id, { chat: [...currentUser.chat, newChat] });
		await UserService.updateUser(currentFriend._id, { chat: [...currentFriend.chat, newChat] });

		// Send notification
		return newChat;
	}
	async getUserOneChat(chatId) {
		return this.findBy('_id', chatId);
	}
	async getChatList() {
		return this.load();
	}
	async getUserChatList(id) {
		const getUserChatIds = await UserService.getUserById(id);
		const chatList = await getUserChatIds.chat.map((chatId) => chatId);
		const result = await chatList.map(async (chatId) => this.find(chatId));
		return Promise.all(result);
	}
	async updateChat(id, obj) {
		return this.update(id, obj);
	}
	async deleteChat(id) {
		return this.delete(id);
	}
}

export default new ChatService(Chat);
