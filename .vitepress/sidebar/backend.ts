import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/backend/maven': [
		{
			text: 'Maven',
			items: [
				{
					text: '安装 & 配置',
					link: '/backend/maven/install',
				},
				{
					text: 'Maven 工程',
					link: '/backend/maven/project',
				},
			],
		},
	],
};

export default sideBar;
