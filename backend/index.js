import express from 'express';
import './database/mongoose.js';
import SocketConnection from './socket/socket-connection.js';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { AuthRouter, ChatRouter, FriendListRouter } from './routes/index.js';
import session from 'express-session';
import morgan from 'morgan';
import { AuthService } from './services/index.js';
import { config } from 'dotenv';
config();
const app = express();
const httpServer = createServer(app);
const sessionMiddleware = session({
	secret: process.env.SESSION_SECRET,
	store: new session.MemoryStore(),
	resave: false,
	saveUninitialized: false,
});
SocketConnection(httpServer, sessionMiddleware);
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cors({ origin: [process.env.ORIGIN], credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(AuthService.initialize);
app.use(AuthService.session);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/chat', ChatRouter);
app.use('/api/v1/friend', FriendListRouter);
app.get('/', (req, res) => {
	res.send('Main menu');
});

httpServer.listen(PORT, () => {
	console.log(`http://127.0.0.1:${PORT}`);
});
