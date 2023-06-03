import { format, parseISO } from 'date-fns';
import localeTR from 'date-fns/locale/tr';
import React from 'react';

const DmItem = ({ whoIs, username, message, timestamp }) => {
	const div = <div className="direct-msg-name">{username}</div>;
	const name = whoIs === 'friend' ? div : '';
	const style = whoIs === 'friend' ? 'friend-msg' : 'me-msg';
	const convertISO = parseISO(timestamp);
	const timeString = format(convertISO, 'HH:mm', { locale: localeTR });
	return (
		<div className={`direct-msg ${style} `}>
			<span className={`${style}-tab`} style={{ borderTopColor: style }}></span>
			{name}
			<div className="direct-msg-content">{message}</div>
			<div className="direct-msg-time">{timeString}</div>
		</div>
	);
};

export default DmItem;
