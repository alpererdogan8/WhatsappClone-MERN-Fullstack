import React, { memo, useEffect, useMemo, useState } from 'react';
import { ProfilePicture, Search, Options } from '../../icons';
import { useChat } from '../../../context/chat_context/Chat';
import { useAuth } from '../../../context/auth_context/Auth';
const Header = () => {
	const [infoTimer, setInfoTimer] = useState(true);
	const { chatToViewState } = useChat();
	const { isLoggedIn } = useAuth();
	const admin = isLoggedIn?.data?.username;
	const friend = useMemo(() => {
		return chatToViewState?.data?.users?.filter((friends) => friends?.username !== admin);
	}, [chatToViewState?.data?._id]);

	useEffect(() => {
		setTimeout(() => {
			setInfoTimer(false);
		}, 3000);
		return () => {
			setInfoTimer(true);
		};
	}, []);
	return (
		<div className="main-top">
			<div className="main-top-profile-picture">
				<ProfilePicture />
			</div>
			<div className="main-top-profile-info">
				<div className="title">{friend[0].username}</div>
				{infoTimer ? <div className="title-info">kişi bilgisi için buraya tıkla</div> : null}
			</div>
			<div className="main-top-button-group">
				<div className="main-top--search" role={'button'}>
					<Search />
				</div>
				<div className="main-top--settings">
					<Options />
				</div>
			</div>
		</div>
	);
};

export default Header;
