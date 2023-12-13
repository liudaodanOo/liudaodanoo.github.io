import { defineConfig } from 'vitepress';
import Sidebars from './sidebar';

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
	title: '🍭🐳咸鱼',
	description: '基于 VitePress + Github Pages',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/images/you.jpg',
		footer: {
			message: 'Released under the MIT License.',
			copyright: `Copyright © 2023-${new Date().getFullYear()} LiudaodanOo`,
		},
		nav: [
			{
				text: '前端',
				activeMatch: '/fronend',
				items: [
					{
						text: 'Vue',
						items: [
							{
								text: '3.0',
								link: '/frontend/vue/3.0/vue-router',
								activeMatch: '/frontend/vue/3.0/vue-router',
							},
							{
								text: '2.0',
								link: '/frontend/vue/2.0/responsive',
								activeMatch: '/frontend/vue/2.0',
							},
						],
					},
				],
			},
			{ text: '后端', link: '/backend/java/maven/introduction', activeMatch: '/backend' },
			{ text: '个人', items: [{ text: 'digiwin', link: '/digiwin/public', activeMatch: '/digiwin' }] },
		],
		socialLinks: [{ icon: 'github', link: 'https://gitee.com/liudaodanOo/markdown' }],
		sidebar: {
			...Sidebars,
		},
		// @ts-ignore
		search,
	},
});
