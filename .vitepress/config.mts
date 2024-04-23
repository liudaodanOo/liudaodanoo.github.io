import { defineConfig } from 'vitepress';
import sidebar from './sidebar';

// algolia配置
const search = {
	provider: 'algolia',
	options: {
		appId: 'Y5IBB10LWN', // Application ID
		apiKey: 'd8fbbb73bf1966863552a496187f5556', // Search API Key
		indexName: 'liudaodanooio', // indexName
	},
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
						text: 'Vue',
						link: '/frontend/vue/2.x.x/responsive',
						activeMatch: '/frontend/vue',
					},
					{
						text: '面试题',
						link: '/frontend/interview/javascript',
						activeMatch: '/frontend/interview',
					},
					{
						text: '问题',
						link: '/frontend/problems/index.md',
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
						activeMatch: '/backend/spring',
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
		search,
	},
});
