import React, { useRef, useState } from 'react';
import { Attach, Emoji } from '../../icons';
import TextArea from 'react-textarea-autosize';
import SendOrText from './sub_components/SendOrText';
import { useAuth } from '../../../context/auth_context/Auth';
import { useMessage } from '../../../context/message_context/Message';
import { useChat } from '../../../context/chat_context/Chat';

const Bottom = () => {
	const { isLoggedIn } = useAuth();
	const { sendMessage } = useMessage();
	const { chatToViewState } = useChat();
	const [isFull, setIsFull] = useState();
	const [message, setMessage] = useState({
		chatId: chatToViewState?.data?._id,
		message: '',
		senderId: isLoggedIn?.data?._id,
	});
	const inputRef = useRef();
	const handleChange = (event) => {
		if (typeof event.target.value !== 'undefined') {
			setIsFull(event.target.value);
		}
		setMessage({ ...message, message: event.target.value });
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.ctrlKey) {
			e.preventDefault();
			sendMessage(message);
		}
		if (e.key === 'Enter' && e.ctrlKey) {
			e.preventDefault();
			const { value, selectionStart } = inputRef.current;
			const newValue = value.slice(0, selectionStart) + '\n' + value.slice(selectionStart);
			inputRef.current.value = newValue;
		}
	};

	return (
		<div className="main-bottom">
			<div className="main-bottom-button-group">
				<div className="main-bottom-button-group--emoji">
					<button>
						<Emoji />
					</button>
				</div>
				<div className="main-bottom-button-group--attach">
					<button>
						<Attach />
					</button>
				</div>
			</div>
			<div className="main-bottom-textbox">
				<TextArea
					ref={inputRef}
					placeholder="Bir mesaj yazın"
					onKeyDown={handleKeyDown}
					value={isFull}
					onChange={handleChange}
				/>
			</div>
			<div className="main-bottom--mic">
				<SendOrText isMicOrSendBtn={isFull} />
			</div>
		</div>
	);
};

export default Bottom;
