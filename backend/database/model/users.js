import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	profileImage: String,
	password: {
		hash: String,
		salt: String,
	},
	chat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', autopopulate: false }],
	timestamp: { type: Date, default: Date.now },
	friends: { type: Array },
});

UserSchema.path('password.hash').validate(function (value) {
	return value.length;
}, 'Password hash cannot be blank.');
UserSchema.path('password.salt').validate(function (value) {
	return value.length;
}, 'Password hash cannot be blank.');

UserSchema.plugin(mongooseAutoPopulate);
UserSchema.plugin(passportLocalMongoose, {
	hashField: 'password.hash',
	saltField: 'password.salt',
});
export default mongoose.model('Users', UserSchema);
