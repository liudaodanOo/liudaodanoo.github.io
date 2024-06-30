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
	],

	// Javascript
	'/frontend/concepts/javascript': [
		{
			text: 'Javascript',
			link: '/frontend/concepts/javascript',
		},
	],
	// Webpack
	'/frontend/concepts/webpack': [
		{
			text: 'Webpack',
			link: '/frontend/concepts/webpack/index',
			items: [
				{
					text: '构建流程',
					link: '/frontend/concepts/webpack/buildprocess',
				},
				{
					text: '模块热替换',
					link: '/frontend/concepts/webpack/hmr',
				},
			],
		},
	],
	// Vue Router
	'/frontend/concepts/vuerouter': [
		{
			text: 'Vue Router',
			link: '/frontend/concepts/vuerouter',
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
