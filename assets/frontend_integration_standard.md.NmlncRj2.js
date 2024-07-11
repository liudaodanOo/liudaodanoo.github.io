import{_ as a,o as n,c as s,R as t}from"./chunks/framework.S8W019Nk.js";const g=JSON.parse('{"title":"规范的整合","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/integration/standard.md","filePath":"frontend/integration/standard.md"}'),e={name:"frontend/integration/standard.md"},i=t(`<h1 id="规范的整合" tabindex="-1">规范的整合 <a class="header-anchor" href="#规范的整合" aria-label="Permalink to &quot;规范的整合&quot;">​</a></h1><h2 id="git" tabindex="-1">git <a class="header-anchor" href="#git" aria-label="Permalink to &quot;git&quot;">​</a></h2><h3 id="commitlint" tabindex="-1">Commitlint <a class="header-anchor" href="#commitlint" aria-label="Permalink to &quot;Commitlint&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># install</span></span>
<span class="line"><span>npm install @commitlint/{cli,config-conventional} --save-dev  --save-exact</span></span>
<span class="line"><span></span></span>
<span class="line"><span># configuration</span></span>
<span class="line"><span>echo &quot;export default { extends: [&#39;@commitlint/config-conventional&#39;] };&quot; &gt; commitlint.config.js</span></span></code></pre></div><h3 id="commitizen" tabindex="-1">Commitizen <a class="header-anchor" href="#commitizen" aria-label="Permalink to &quot;Commitizen&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># install</span></span>
<span class="line"><span>npm install commitizen --save-dev --save-exact</span></span>
<span class="line"><span></span></span>
<span class="line"><span># init project to use cz-conventional-changelog adapter</span></span>
<span class="line"><span>npx --no -- commitizen init cz-conventional-changelog --save-dev --save-exact</span></span></code></pre></div><h3 id="husky" tabindex="-1">Husky <a class="header-anchor" href="#husky" aria-label="Permalink to &quot;Husky&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># install</span></span>
<span class="line"><span>npm install husky --save-dev --save-exact</span></span>
<span class="line"><span></span></span>
<span class="line"><span># husky init</span></span>
<span class="line"><span>npx husky init</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add prepare-commit-msg hook</span></span>
<span class="line"><span>echo &quot;exec &lt; /dev/tty &amp;&amp; npx cz --hook || true&quot; &gt; .husky/prepare-commit-msg</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add commit-msg hook, 整合commitizen后，可以不必使用commitlint了</span></span>
<span class="line"><span>echo &quot;npx --no -- commitlint --edit \\$1&quot; &gt; .husky/commit-msg</span></span></code></pre></div>`,8),p=[i];function o(l,c,d,r,m,h){return n(),s("div",null,p)}const v=a(e,[["render",o]]);export{g as __pageData,v as default};
