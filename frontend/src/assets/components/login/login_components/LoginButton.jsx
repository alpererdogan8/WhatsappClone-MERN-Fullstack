import React from 'react';

const LoginButton = ({ onClick }) => {
	return (
		<button className="login-button" onClick={onClick}>
			Login
		</button>
	);
};

export default LoginButton;
