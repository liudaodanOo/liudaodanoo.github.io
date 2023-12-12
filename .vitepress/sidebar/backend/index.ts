import { DefaultTheme } from 'vitepress';
import JavaSideBar from './java';

const sideBar: DefaultTheme.Sidebar = {
	'/backend': [JavaSideBar],
};

export default sideBar;
