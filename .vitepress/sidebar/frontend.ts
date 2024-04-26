import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/frontend/vue': [
		{
			text: 'Vue.v2+',
			base: '/frontend/vue/2.x.x',
			items: [
				{
					text: '响应式原理',
					link: '/responsive',
				},
			],
		},
		{
			text: 'Router.v4+',
			link: '/frontend/vue/router/4.x.x',
		},
	],
	'/frontend/interview': [
		{
			text: 'Javascript',
			link: '/frontend/interview/javascript',
		},
	],
	'/frontend/problems': [
		{
			text: 'Javascript',
			link: '/frontend/problems/javascript',
		},
	],
};

export default sideBar;
