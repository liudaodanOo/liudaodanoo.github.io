import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/backend/maven': [
		{
			text: 'Maven',
			items: [
				{
					text: '安装',
					link: '/backend/maven/install',
				},
				{
					text: '工程创建',
					link: '/backend/maven/project',
				},
				{
					text: '依赖和构建管理',
					link: '/backend/maven/manage',
				},
				{
					text: '继承和聚合特性',
					link: '/backend/maven/features',
				},
			],
		},
	],
};

export default sideBar;
