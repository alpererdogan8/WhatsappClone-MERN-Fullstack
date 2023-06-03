import { useContext, createContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth_context/Auth';
import { initialState, reducer } from '../../utils/reducers';
import { api } from '../../utils/axios/config';

const ChatContext = createContext();

/**
 * 
	[TR]:
	Socket.io da auth implementasyonunu 
	tam anlayamadım ya da çözemedim şimdilik böyle bir yol denedim	 

	[EN]:
	Auth implementation in Socket.io 
	I didn't quite understand or figure it out, so I tried this way for now	 

	*/

export const ChatProvider = ({ children }) => {
	const [chatState, dispatchChat] = useReducer(reducer, initialState);
	const [friendState, dispatchFriend] = useReducer(reducer, initialState);
	const [chatToViewState, dispatchChatToView] = useReducer(reducer, initialState);
	const { isLoggedIn } = useAuth();

	const getChatList = async () => {
		try {
			const { data } = await api.get(`/chat/${isLoggedIn.data._id}/list`);
			dispatchChat({ type: 'success', payload: { ...chatState, data } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatchChat({ type: 'error', payload: { ...chatState, error: { status, statusText } } });
		}
	};

	const getFriendList = async () => {
		try {
			const { data } = await api.get('/friend');
			dispatchFriend({ type: 'success', payload: { ...friendState, data } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatchFriend({ type: 'error', payload: { ...friendState, error: { status, statusText } } });
		}
	};

	const createChat = async (friendId) => {
		try {
			const { data } = await api.post('/chat/create', { friendId });
			dispatchChat({ type: 'success', payload: { ...chatState, data: [...chatState.data, data] } });
			dispatchChatToView({ type: 'success', payload: { ...chatToViewState, data: data } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatchChat({ type: 'error', payload: { ...chatState, error: { status, statusText } } });
		}
	};
	const addFriend = async (friendName) => {
		try {
			const { data } = await api.post('/friend/add', { friendName });
			dispatchFriend({ type: 'success', payload: { ...friendState, data, toastToggle: true } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatchFriend({
				type: 'error',
				payload: { ...friendState, data: [...friendState.data], error: { status, statusText } },
			});
		}
	};

	const chatToMessage = (data) => {
		try {
			dispatchChatToView({ type: 'success', payload: { ...chatToViewState, data } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatchChatToView({ type: 'error', payload: { ...chatToViewState, error: { status, statusText } } });
		}
	};
	const chatToSocketAddMessage = (data) => {
		try {
			dispatchChatToView({
				type: 'success',
				payload: {
					...chatToViewState,
					data: {
						...chatToViewState.data,
						messages: [...chatToViewState.data.messages, data],
					},
				},
			});
		} catch (error) {
			dispatchChatToView({
				type: 'error',
				payload: {
					...chatToViewState,
					error,
				},
			});
		}
	};

	const data = {
		chatState,
		getChatList,
		friendState,
		dispatchFriend,
		getFriendList,
		chatToViewState,
		chatToSocketAddMessage,
		chatToMessage,
		addFriend,
		createChat,
	};
	return <ChatContext.Provider value={data}>{children} </ChatContext.Provider>;
};

export const useChat = () => {
	return useContext(ChatContext);
};
