import React, { useEffect } from 'react';
import DirectMessage from './sub_components/DirectMessage';
import { useChat } from '../../../context/chat_context/Chat';
import { useAuth } from '../../../context/auth_context/Auth';
import { useMessage } from '../../../context/message_context/Message';
// TODO: ADD PROFILE IMAGE AND PROFILE IMAGE UPLOAD SYSTEM
const DirectMsgItem = () => {
	const { getChatList, chatState, chatToMessage, chatToViewState } = useChat();
	const { isLoggedIn } = useAuth();
	const { joinRoom } = useMessage();
	const admin = isLoggedIn?.data?.username;
	const friend = chatState.data.map((friendList) => {
		return friendList.users.filter((friend) => friend.username !== admin);
	});
	/* eslint-disable */
	useEffect(() => {
		getChatList();
	}, [chatToViewState?.data?.messages]);
	return (
		<>
			{chatState.data &&
				chatState.data.map((dataItem, key) => {
					joinRoom(dataItem?._id);
					if (dataItem.messages.length === 0) return null;
					return (
						<DirectMessage
							key={key}
							name={friend[key][0].username}
							content={dataItem.messages[dataItem.messages.length - 1].message}
							time={dataItem.timestamp}
							onClick={() => chatToMessage(dataItem)}
							// isfriend={false}
						/>
					);
				})}
		</>
	);
};

export default DirectMsgItem;
