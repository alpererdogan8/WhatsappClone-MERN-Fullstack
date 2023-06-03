import React, { useEffect, useRef } from 'react';
import DmItem from './DmItem';
import { useChat } from '../../../../context/chat_context/Chat';
import { useAuth } from '../../../../context/auth_context/Auth';

const DmItemBox = () => {
	const { chatToViewState } = useChat();
	const { isLoggedIn } = useAuth();
	const messageRef = useRef(null);
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatToViewState?.data?.messages]);
	return (
		<div className="direct-msg-box">
			{chatToViewState &&
				chatToViewState.data.messages.map((messageItem, key) => {
					return (
						<>
							<DmItem
								key={key}
								username={messageItem?.sender?.username}
								whoIs={isLoggedIn?.data?._id !== messageItem?.sender ? 'friend' : 'me'}
								message={messageItem.message}
								timestamp={messageItem.timestamp}
							/>
							<span ref={messageRef}></span>
						</>
					);
				})}
		</div>
	);
};

export default DmItemBox;
