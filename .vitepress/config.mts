import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import sidebar from './sidebar';

// algolia配置
// const search = {
// 	provider: 'algolia',
// 	options: {
// 		appId: 'Y5IBB10LWN', // Application ID
// 		apiKey: 'd8fbbb73bf1966863552a496187f5556', // Search API Key
// 		indexName: 'liudaodanooio', // indexName
// 	},
// };

const vitepressOptions = defineConfig({
	head: [
		[
			'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
			{ rel: 'icon', href: '/images/favicon.ico' },
		],
	],
	title: '🍭🐳刘捣蛋',
	description: '基于 VitePress + Github Pages',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/images/you.jpg',
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © 2023-${new Date().getFullYear()} liudaodanOo`,
		},
		nav: [
			{
				text: '前端',
				activeMatch: '/fronend',
				items: [
					{
						text: '概念',
						link: '/frontend/concepts/index',
						activeMatch: '/frontend/concepts',
					},
					{
						text: '问题',
						link: '/frontend/problems/javascript',
						activeMatch: '/frontend/problems',
					},
				],
			},
			{
				text: '后端',
				activeMatch: '/backend',
				items: [
					{
						text: 'Maven',
						link: '/backend/maven/install',
						activeMatch: '/backend/maven',
					},
					{
						text: 'Spring',
						link: '/backend/spring/framework',
						activeMatch: '/backend/spring/',
					},
					{
						text: 'SpringBoot',
						link: '/backend/springboot/mybatis',
						activeMatch: '/backend/springboot',
					},
					{
						text: 'Docker',
						link: '/backend/docker',
						activeMatch: '/backend/docker',
					},
				],
			},
			// {
			// 	text: '个人',
			// 	items: [{ text: '首页', link: '/' }],
			// },
		],
		// @TODO: gitee链接
		// socialLinks: [{ icon: 'github', link: 'https://gitee.com/liudaodanOo/liudaodanOo' }],
		sidebar,
		// @ts-ignore
		// search,
	},
});

// https://vitepress.dev/reference/site-config
export default withMermaid({
	// // optionally, you can pass MermaidConfig
	// mermaid: {
	// 	// refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
	// },
	// mermaidPlugin: {
	// 	class: 'mermaid my-class', // set additional css classes for parent container
	// },
	...vitepressOptions,
});
