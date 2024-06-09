import { DefaultTheme } from 'vitepress';

const sideBar: DefaultTheme.Sidebar = {
	'/backend/maven/': [
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
	'/backend/spring/': [
		{
			text: 'Spring',
			base: '/backend/spring',
			items: [
				{
					text: 'Framework',
					link: '/framework',
				},
				{
					text: 'IOC',
					collapsed: true,
					items: [
						{
							text: '容器和核心概念',
							link: '/ioc-concept',
						},
						{
							text: '实践和应用',
							link: '/ioc-practice',
						},
					],
				},
				{
					text: 'AOP',
					link: '/aop',
				},
			],
		},
	],

	'/backend/springboot': [
		{
			text: 'SpringBoot',
			base: '/backend/springboot',
			items: [
				{
					text: 'Mybatis',
					link: '/mybatis',
				},
				{
					text: 'Mybatis-Plus',
					link: '/mybatis-plus',
				},
				{
					text: 'Spring Cache',
					base: '/backend/springboot/springCache',
					link: '/index',
					items: [{ text: 'Redis', link: '/redis' }],
				},
				{
					text: 'RabbitMQ',
					link: '/rabbitmq',
				},
			],
		},
	],
	'/backend/docker': [
		{
			text: 'Dokcer',
			link: '/backend/docker',
		},
	],
};

export default sideBar;
