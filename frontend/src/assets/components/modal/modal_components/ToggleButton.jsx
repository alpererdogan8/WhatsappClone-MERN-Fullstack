const ToggleButton = ({ onClick, toggle }) => {
	return (
		<div role="button" onClick={onClick}>
			{toggle ? 'Giriş Yap' : 'Üye ol'}
		</div>
	);
};

export default ToggleButton;
