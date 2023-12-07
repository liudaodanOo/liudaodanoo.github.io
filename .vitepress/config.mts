import { defineConfig } from 'vitepress';
import SideBars from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '🍭🐳刘捣蛋的随笔',
	description: '基于 vitepress + giteeio 的随笔博客',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: '/images/you.jpg',
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-PRESENT liudaodanOo',
		},
		nav: [
			{ text: '个人', link: '/profile/', activeMatch: '/profile' },
			{ text: '鼎捷', link: '/digiwin/public', activeMatch: '/digiwin' },
		],
		socialLinks: [{ icon: 'github', link: 'https://gitee.com/liudaodanOo/markdown' }],
		sidebar: {
			...SideBars,
		},
	},
});
