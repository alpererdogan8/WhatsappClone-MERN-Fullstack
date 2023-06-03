import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/whatsappDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
	console.log('we are connected to mongoDB');
});
