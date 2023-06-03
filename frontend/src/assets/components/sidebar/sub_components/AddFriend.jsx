import React, { useEffect, useState } from 'react';
import { Add, Send } from '../../../icons';
import { useChat } from '../../../../context/chat_context/Chat';
import { useAuth } from '../../../../context/auth_context/Auth';

const Input = (props) => {
	const { handleSubmit } = props;
	return (
		<>
			<form method="POST" onSubmit={handleSubmit}>
				<input {...props} />
				<button type="submit" className="message-input--button">
					<Send />
				</button>
			</form>
		</>
	);
};

const AddFriend = (props) => {
	const [input, setInput] = useState('');
	const [add, setAdd] = useState(false);
	const { addFriend, getFriendList } = useChat();
	const { handleToast } = useAuth();

	const handleChange = async (e) => {
		e.preventDefault();
		await addFriend(input);
		setInput('');
		// getFriendList();
		// handleToast();
	};

	return (
		<div className="sidebar-item" onClick={() => setAdd(true)} {...props}>
			<div className="profile-picture">
				<div className="picture">
					<Add />
				</div>
			</div>

			<div className="message-article">
				<div className="message-info">
					<div className="message-name">
						<div className="message-input">
							{!add ? (
								'Ekle'
							) : (
								<Input
									type="text"
									handleSubmit={handleChange}
									value={input}
									onChange={(e) => setInput(e.target.value)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddFriend;
