import Main from '../main/Main';
import { MainWelcome } from '../main/sub_components';
import SideBarGroup from '../sidebar/SideBarGroup';

const LoggedIn = ({ messageScreen }) => {
	return (
		<>
			<SideBarGroup />
			{messageScreen ? <MainWelcome /> : <Main />}
		</>
	);
};
export default LoggedIn;
