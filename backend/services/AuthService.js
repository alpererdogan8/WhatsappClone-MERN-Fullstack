import Users from '../database/model/users.js';
import BaseService from './BaseService.js';

import passportConfig from '../config/passportConfig.js';
import UserService from './UserService.js';

class AuthService extends BaseService {
	constructor(model) {
		super(model);
		this.initialize = passportConfig.initialize();
		this.session = passportConfig.session();
	}

	async register(username, password) {
		try {
			const isUser = await this.findBy('username', username);

			if (isUser) {
				const error = new Error();
				error.statusCode = 409;
				throw error;
			}
			if (!isUser) {
				const newUser = await UserService.createUser(username, password, 'default');
				return newUser;
			}
		} catch (error) {
			throw new Error('Register failed: ' + error);
		}
	}
	login() {
		return passportConfig.authenticate('local');
	}
}

export default new AuthService(Users);
