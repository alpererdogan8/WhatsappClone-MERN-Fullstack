import { useEffect } from 'react';

const useOnClickOutside = (ref, callback) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref || !ref.current || ref.current.contains(event.target)) {
				return;
			}
			callback(event);
		};
		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [ref, callback]);
};

export default useOnClickOutside;
