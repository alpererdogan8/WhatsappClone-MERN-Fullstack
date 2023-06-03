import React from 'react';
import { Check, Error } from '../../icons';

const Toast = ({ key, isSuccess, successMessage = 'Login Success', errorMessage = 'Error' }) => {
	const toastStyle = isSuccess ? '--success' : '--error';

	return (
		<div key={key} className={`toast toast${toastStyle} toast--animation `}>
			<div className="toast-icon">{isSuccess ? <Check /> : <Error />}</div>
			<div className="toast-text">{isSuccess ? successMessage : errorMessage}</div>
		</div>
	);
};

export default Toast;
