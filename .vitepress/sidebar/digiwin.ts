import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/digiwin': [
		{
			text: '公共资源',
			link: '/digiwin/public',
		},
		{
			text: '业务相关',
			items: [
				{
					text: '问题快反',
					link: '/digiwin/business/frc',
				},
				{
					text: 'ChatFile',
					link: '/digiwin/business/kcf',
				},
				{
					text: '知识中台',
					link: '/digiwin/business/kmo',
				},
			],
		},
	],
};

export default sideBar;
