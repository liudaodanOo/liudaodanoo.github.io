import { DefaultTheme } from 'vitepress';
import VueSidebar from './vue';

const sideBar: DefaultTheme.Sidebar = {
	'/frontend': [VueSidebar],
};

export default sideBar;
