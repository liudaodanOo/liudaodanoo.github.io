import { defineConfig } from 'vitepress';
import SideBars from './sidebar';

// algolia配置
const search = {
	provider: 'algolia',
	options: {
		appId: 'Y5IBB10LWN', // 你的 Application ID
		apiKey: 'd8fbbb73bf1966863552a496187f5556', // 你的Search API Key
		indexName: 'liudaodanooio', // 你的indexName
	},
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
	head: [
		[
			'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
			{ rel: 'icon', href: '/images/you.jpg' },
		],
	],
	title: '🍭🐳咸鱼',
	description: '基于 VitePress + Github Pages',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/images/you.jpg',
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-PRESENT liudaodanOo',
		},
		nav: [
			{ text: '个人', link: '/profile/', activeMatch: '/profile' },
			{ text: '其他', items: [{ text: 'digiwin', link: '/digiwin/public', activeMatch: '/digiwin' }] },
		],
		socialLinks: [{ icon: 'github', link: 'https://gitee.com/liudaodanOo/markdown' }],
		sidebar: {
			...SideBars,
		},
		// @ts-ignore
		search,
	},
});
