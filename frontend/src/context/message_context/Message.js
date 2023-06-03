import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../auth_context/Auth';
import { useChat } from '../chat_context/Chat';
export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
	const socket = io('http://127.0.0.1:8080', {
		cors: true,
		withCredentials: true,
	});

	const { isLoggedIn } = useAuth();
	const { dispatchFriend, friendState, chatToSocketAddMessage } = useChat();

	const joinRoom = (data) => {
		socket.emit('join-room', data);
	};

	const sendMessage = (data) => {
		socket.emit('send-message', data);
	};

	const deleteMessage = () => {};

	socket.on('connect', () => {
		socket.emit('authentication_server', isLoggedIn.data._id);
		if (typeof isLoggedIn?.data?._id === 'undefined') {
			return socket.disconnect();
		}
		socket.on('private-room', (data) => {
			chatToSocketAddMessage(data);
		});
		socket.on('friend-list:add', (data) => {
			dispatchFriend({ type: 'success', payload: { ...friendState, data } });
		});
	});
	const data = {
		sendMessage,
		joinRoom,
	};
	return <MessageContext.Provider value={data}> {children}</MessageContext.Provider>;
};

export const useMessage = () => {
	return useContext(MessageContext);
};
