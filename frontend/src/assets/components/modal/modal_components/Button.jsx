import React from 'react';

const Button = ({ onClick, value }) => {
	return <input onClick={onClick} type="submit" value={value} />;
};

export default Button;
