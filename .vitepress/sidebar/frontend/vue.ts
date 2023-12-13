import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.SidebarItem = {
	text: 'Vue',
	items: [
		{
			text: '3.0',
			items: [
				{
					text: 'Vue router',
					link: '/frontend/vue/3.0/vue-router',
				},
			],
		},
		{
			text: '2.0',
			items: [
				{
					text: '响应式原理',
					link: '/frontend/vue/2.0/responsive',
				},
			],
		},
	],
};

export default sideBar;
