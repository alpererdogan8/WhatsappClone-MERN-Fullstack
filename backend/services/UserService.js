import Users from '../database/model/users.js';
import BaseService from './BaseService.js';

class UserService extends BaseService {
	async createUser(username, password, profileImage) {
		if (username === '' || password === '') return 'Not a valid username or password';
		try {
			const user = await this.insert({ username, profileImage });
			await user.setPassword(password);
			await user.save();
			return 'user created successfully';
		} catch (error) {
			throw error;
		}
	}
	async updateUser(id, obj) {
		try {
			return this.update(id, obj);
		} catch (error) {
			throw error;
		}
	}

	async addFriend(user, friend) {
		try {
			const currentUser = await this.getByUsername(user);
			const currentFriend = await this.getByUsername(friend);

			const isAdd = currentUser.friends.includes(currentFriend._id);

			if (isAdd) {
				throw {
					status: 409,
					message: 'Already added',
				};
			}

			await this.update(currentUser._id, {
				friends: [...currentUser.friends, currentFriend._id],
			});
			currentUser.friends.push(currentFriend._id);
			await this.update(currentFriend._id, {
				friends: [...currentFriend.friends, currentUser._id],
			});
			currentFriend.friends.push(currentUser._id);

			return this.getUserById(currentUser._id);
		} catch (error) {
			if (error.status === 409) {
				throw {
					status: error.status,
					message: error.message,
				};
			}
			throw {
				status: 400,
				message: "Username doesn't exist",
			};
		}
	}

	async getFriends(id) {
		return this.find(id);
	}
	async editUserProfile(userId, profileImage) {
		return this.update(userId, { profileImage });
	}

	async addChat(userId, chat) {
		return this.update(userId, chat);
	}

	async getUserById(id) {
		try {
			return this.find(id);
		} catch (error) {
			throw error;
		}
	}

	async getByUsername(username) {
		try {
			return await this.findBy('username', username);
		} catch (error) {
			throw error;
		}
	}
}

export default new UserService(Users);
