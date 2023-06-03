import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const ChatSchema = new mongoose.Schema({
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', autopopulate: { maxDepth: 1 } }],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', autopopulate: { maxDepth: 1 } }],
	timestamp: { type: Date, default: Date.now },
});

ChatSchema.plugin(mongooseAutoPopulate);
export default mongoose.model('Chat', ChatSchema);
