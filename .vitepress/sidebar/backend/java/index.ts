import { DefaultTheme } from 'vitepress';
import MavenSidebar from './maven';

const sideBar: DefaultTheme.SidebarItem = {
	text: 'Java',
	items: [...MavenSidebar],
};

export default sideBar;
