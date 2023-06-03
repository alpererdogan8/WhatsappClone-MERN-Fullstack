import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.sass';
import App from './App';
import { AuthProvider } from './context/auth_context/Auth.js';
import { ChatProvider } from './context/chat_context/Chat.js';
import { MessageProvider } from './context/message_context/Message.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider>
		<ChatProvider>
			<MessageProvider>
				<App />
			</MessageProvider>
		</ChatProvider>
	</AuthProvider>,
);
