import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { api } from '../../utils/axios/config.js';
import { reducer, initialState } from '../../utils/reducers/index.js';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, dispatch] = useReducer(reducer, initialState);
	const [toast, setToast] = useState([]);
	const handleToast = () => {
		const newToast = { id: Date.now() };

		setToast((prevToasts) => [...prevToasts, newToast]);
		setTimeout(() => {
			setToast((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
		}, 0.1);
	};

	const register = async (username, password) => {
		try {
			await api.post('/auth/register', { username, password });
			await login(username, password);
		} catch (error) {
			const { status, statusText } = error.response;
			dispatch({
				type: 'error',
				payload: { ...isLoggedIn, error: { status, statusText, message: 'User Already Exists' }, toastToggle: true },
			});
		}
	};
	const login = async (username, password) => {
		try {
			const { data } = await api.post('/auth/login', { username, password });
			dispatch({ type: 'success', payload: { ...isLoggedIn, data, toastToggle: true } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatch({ type: 'error', payload: { ...isLoggedIn, error: { status, statusText }, toastToggle: true } });
		}
	};

	const isLogin = async () => {
		try {
			const { data } = await api.get('/auth/user-data', { withCredentials: true });
			dispatch({ type: 'success', payload: { ...isLoggedIn, data } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatch({ type: 'error', payload: { ...isLoggedIn, error: { status, statusText } } });
		}
	};
	const logout = async (e) => {
		e.preventDefault();
		try {
			const { data } = await api.post('/auth/logout');
			dispatch({ type: 'success', payload: { ...isLoggedIn, data, toastToggle: true } });
		} catch (error) {
			const { status, statusText } = error.response;
			dispatch({ type: 'error', payload: { ...isLoggedIn, error: { status, statusText }, toastToggle: true } });
		}
	};

	/* eslint-disable */
	useEffect(() => {
		isLogin();
	}, []);

	const data = { isLoggedIn, login, register, logout, toast, setToast, handleToast };
	return <AuthContext.Provider value={data}> {children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
