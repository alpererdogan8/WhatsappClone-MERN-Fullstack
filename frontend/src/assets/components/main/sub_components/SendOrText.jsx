import { Microphone, Send } from '../../../icons';

const SendOrText = ({ isMicOrSendBtn }) => {
	if (isMicOrSendBtn) {
		return (
			<button>
				<Send />
			</button>
		);
	}
	return (
		<button>
			<Microphone />
		</button>
	);
};

export default SendOrText;
