import { useEffect, useState } from 'react';
import LoginScreen from './assets/components/login/LoginScreen';
import { useAuth } from './context/auth_context/Auth';
import Toast from './assets/components/global_components/Toast';
import LoggedIn from './assets/components/login/LoggedIn';
import { useChat } from './context/chat_context/Chat';
function App() {
	const { chatToViewState } = useChat();
	const [isChange, setIsChange] = useState(true);
	const { isLoggedIn, toast } = useAuth();
	useEffect(() => {
		if (Object.keys(chatToViewState.data).length !== 0) {
			setIsChange(false);
			return () => {
				setIsChange(true);
			};
		}
	}, [chatToViewState]);
	const isSuccessState = Object.keys(isLoggedIn?.data)?.length !== 0 ? true : false;

	return (
		<>
			<div tabIndex={0} onKeyDown={(e) => e.key === 'Escape' && setIsChange(true)} className="wp-main">
				{isLoggedIn.toastToggle && (
					<Toast key={toast} isSuccess={isSuccessState} errorMessage={isLoggedIn?.error?.message} />
				)}
				{Object.keys(isLoggedIn?.data)?.length === 0 ? <LoginScreen /> : <LoggedIn messageScreen={isChange} />}
			</div>
		</>
	);
}

export default App;
