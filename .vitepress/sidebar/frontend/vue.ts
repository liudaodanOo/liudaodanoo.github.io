import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.SidebarItem = {
	text: 'Vue',
	items: [
		{
			text: '3.0',
			link: '/frontend/vue/3.0/vue-router',
			items: [
				{
					text: 'Vue router',
					link: '/frontend/vue/3.0/vue-router',
				},
			],
		},
	],
};

export default sideBar;
