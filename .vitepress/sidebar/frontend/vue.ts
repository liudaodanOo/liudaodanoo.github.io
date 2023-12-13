import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/frontend/vue/3.0': [
		{
			text: 'Vue router',
			link: '/frontend/vue/3.0/vue-router',
		},
	],
	'/frontend/vue/2.0': [
		{
			text: '响应式原理',
			link: '/frontend/vue/2.0/responsive',
		},
	],
};

export default sideBar;
