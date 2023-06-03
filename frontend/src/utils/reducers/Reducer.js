import { ACTION } from './Action.js';

export const reducer = (state, action) => {
	switch (action.type) {
		case ACTION.SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				error: null,
				toastToggle: action.payload.toastToggle,
			};

		case ACTION.ERROR:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				error: action.payload.error,
				toastToggle: action.payload.toastToggle,
			};
		default:
			return { ...state };
	}
};
