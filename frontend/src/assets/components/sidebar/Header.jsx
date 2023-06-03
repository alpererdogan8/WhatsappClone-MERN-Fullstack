import React, { useEffect, useRef, useState } from 'react';
import { ProfilePicture, Options, StoryNew } from '../../icons';
import NewMessage from './sub_components/NewMessage';
import useOnClickOutside from '../../../utils/hooks/useOnClickOutside';
import AddFriend from './sub_components/AddFriend';
import DirectMessage from './sub_components/DirectMessage';
import { useChat } from '../../../context/chat_context/Chat';
import { useAuth } from '../../../context/auth_context/Auth';

const Header = () => {
	const [messageToggle, setMessageToggle] = useState(false);
	const [optionsToggle, setOptionsToggle] = useState(false);
	const refDropdown = useRef(null);
	useOnClickOutside(refDropdown, () => setMessageToggle(false));
	useOnClickOutside(refDropdown, () => setOptionsToggle(false));

	const { friendState, getFriendList, createChat } = useChat();
	const { logout } = useAuth();
	/* eslint-disable */
	useEffect(() => {
		getFriendList();
	}, [friendState.data.length]);

	const handleCreateChat = (id) => {
		createChat(id);
		setMessageToggle(false);
	};

	return (
		<div className="sidebar-header">
			<div className="sidebar-profile-picture">
				<ProfilePicture />
			</div>
			<div className="sidebar-item-group">
				<div tabIndex={-1} className="sidebar-item--stories">
					<StoryNew />
				</div>

				<div
					onClick={() => setMessageToggle(true)}
					className={`sidebar-item--new-message ${!messageToggle ? '' : 'sidebar-item--focus'}`}>
					<NewMessage />
				</div>
				{messageToggle && (
					<div ref={refDropdown} className="sidebar-item--dropdown">
						<AddFriend />
						{/* <Toast key={toast} isSuccess={'Friend Added'} errorMessage={friendState?.error?.message} /> */}
						{friendState?.data.length > 0
							? friendState?.data?.map((friend, key) => {
									return (
										<DirectMessage
											onClick={() => handleCreateChat(friend._id)}
											key={key}
											name={friend.username}
											isfriend="true"
										/>
									);
							  })
							: null}
					</div>
				)}
				<div onClick={() => setOptionsToggle(true)} tabIndex={-1} className="sidebar-item--settings">
					<Options />
				</div>
				{optionsToggle && (
					<form ref={refDropdown} method="POST" className="sidebar-item--dropdown">
						<button onClick={logout} type="submit">
							Çıkış Yap
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Header;
