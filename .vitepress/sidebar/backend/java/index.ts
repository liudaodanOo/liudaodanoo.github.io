import { DefaultTheme } from 'vitepress';
import MavenSidebar from './maven';

console.log('MavenSidebar', MavenSidebar);
const sideBar: DefaultTheme.SidebarItem = {
	text: 'Java',
	items: [...MavenSidebar],
};

export default sideBar;
