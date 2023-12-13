import { DefaultTheme } from 'vitepress';
import VueSidebar from './vue';
import VueRouterSidebar from './vue-router';

const sideBar: DefaultTheme.Sidebar = {
	...VueSidebar,
	...VueRouterSidebar,
};

export default sideBar;
