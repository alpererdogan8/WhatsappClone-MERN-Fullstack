import { useRef, useState } from 'react';
import Button from './modal_components/Button';
import Header from './modal_components/Header';
import ToggleButton from './modal_components/ToggleButton';
import { useAuth } from '../../../context/auth_context/Auth';

const Register = ({ onClick }) => {
	//false => Register or true => Login
	const [loginToggle, setLoginToggle] = useState(false);
	const usernameRef = useRef();
	const passwordRef = useRef();
	const { login, register, handleToast } = useAuth();
	const handleLoginClick = () => {
		setLoginToggle(!loginToggle);
	};

	const handleSubmitData = async () => {
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;

		if (!loginToggle) {
			login(username.toLowerCase(), password);
		} else {
			register(username.toLowerCase(), password);
		}
	};
	return (
		<div className="modal">
			<span onClick={onClick}></span>
			<div className="modal-card">
				<header>
					<Header context={!loginToggle ? 'Giriş Yap' : 'Üye Ol'} />
					<div className="toggle-btn"></div>
				</header>

				<form method="post">
					<input ref={usernameRef} type="text" placeholder="Kullanıcı adı" />
					<input ref={passwordRef} type="password" placeholder="Şifre" />
					<Button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							handleSubmitData();
							handleToast();
						}}
						value={!loginToggle ? 'Giriş Yap' : 'Üye Ol'}
					/>
				</form>
				<ToggleButton onClick={handleLoginClick} toggle={loginToggle} />
			</div>
		</div>
	);
};

export default Register;
