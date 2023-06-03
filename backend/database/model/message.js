import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const MessageSchema = new mongoose.Schema({
	chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', autopopulate: false },
	sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', autopopulate: false },
	message: String,
	timestamp: { type: Date, default: Date.now },
});
MessageSchema.plugin(mongooseAutoPopulate);
export default mongoose.model('Message', MessageSchema);
