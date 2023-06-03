import React, { useState } from 'react';
import ProfilePhoto from '../../global_components/ProfilePhoto';
import FriendReq from './direct_message_components/FriendReq';
import { format, parseISO } from 'date-fns';
import localeTR from 'date-fns/locale/tr';

const DirectMessage = (props) => {
	let time;
	if (props.time) {
		const convertISO = parseISO(props.time);
		time = format(convertISO, 'HH:mm', { locale: localeTR });
	}
	return (
		<div className="sidebar-item" {...props}>
			<div className="profile-picture">{props.profilephoto}</div>

			<div className="message-article">
				<div className="message-info">
					<div className="message-name">{props.name}</div>
					{props.isfriend ? <div className="message-time">{time}</div> : <FriendReq />}
				</div>
				{props.isfriend ? <div className="message-content">{props.content}</div> : null}
			</div>
		</div>
	);
};

DirectMessage.defaultProps = {
	isfriend: true,
	profilephoto: <ProfilePhoto />,
};

export default DirectMessage;
