import{_ as a,o as s,c as n,R as p}from"./chunks/framework.S8W019Nk.js";const v=JSON.parse('{"title":"工程创建","description":"","frontmatter":{},"headers":[],"relativePath":"backend/maven/project.md","filePath":"backend/maven/project.md"}'),e={name:"backend/maven/project.md"},l=p(`<h1 id="工程创建" tabindex="-1">工程创建 <a class="header-anchor" href="#工程创建" aria-label="Permalink to &quot;工程创建&quot;">​</a></h1><h2 id="gavp属性" tabindex="-1">GAVP属性 <a class="header-anchor" href="#gavp属性" aria-label="Permalink to &quot;GAVP属性&quot;">​</a></h2><ul><li>G: groupId 组织标识</li><li>A: artifactId 产品标识</li><li>V: version 版本号</li><li>P: packaging 打包方式</li></ul><h3 id="gav-规范" tabindex="-1">GAV 规范 <a class="header-anchor" href="#gav-规范" aria-label="Permalink to &quot;GAV 规范&quot;">​</a></h3><ol><li>groupId的规范</li></ol><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 最多4级</span></span>
<span class="line"><span>com.[公司/BU].[业务线].[子业务线]</span></span></code></pre></div><ol start="2"><li><p>artifactId的规范</p><p>语义不重复不遗漏，先到仓库中心去查证一下。</p></li></ol><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 正确的例子</span></span>
<span class="line"><span>oo-client</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>oo-api</span></span>
<span class="line"><span># or</span></span>
<span class="line"><span>oo-tool</span></span></code></pre></div><ol start="3"><li>version的规范</li></ol><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 正确的例子</span></span>
<span class="line"><span>[主版本号].[次版本号].[修订号]</span></span></code></pre></div><p>1) 主版本号：做了不兼容的 API 修改，或者增加了能改变产品方向的新功能</p><p>2) 次版本号：当做了向下兼容的功能性新增（新增类、接口等）</p><p>3) 修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性</p><h3 id="packaging-规范" tabindex="-1">packaging 规范 <a class="header-anchor" href="#packaging-规范" aria-label="Permalink to &quot;packaging 规范&quot;">​</a></h3><p>packaging用于指定打包后的文件类型，有如下几个值：</p><ul><li>jar（默认值）：普通的Java工程，打包后文件的后缀名是 <strong>.jar</strong></li><li>war：代表Java的Web工程，打包后文件的后缀名是 <strong>.war</strong></li><li>pom：表示不会打包，用来做继承的父工程</li></ul><h2 id="工程目录说明" tabindex="-1">工程目录说明 <a class="header-anchor" href="#工程目录说明" aria-label="Permalink to &quot;工程目录说明&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- pom.xml                               # Maven 项目管理文件</span></span>
<span class="line"><span>|-- src</span></span>
<span class="line"><span>    |-- main                              # 项目主要代码</span></span>
<span class="line"><span>    |   |-- java                          # Java 源代码目录</span></span>
<span class="line"><span>    |   |   \`-- com/example/myapp         # 开发者代码主目录</span></span>
<span class="line"><span>    |   |       |-- controller            # 存放 Controller 层代码的目录</span></span>
<span class="line"><span>    |   |       |-- service               # 存放 Service 层代码的目录</span></span>
<span class="line"><span>    |   |       |-- dao                   # 存放 DAO 层代码的目录</span></span>
<span class="line"><span>    |   |       \`-- model                 # 存放数据模型的目录</span></span>
<span class="line"><span>    |   |-- resources                     # 资源目录，存放配置文件、静态资源等</span></span>
<span class="line"><span>    |   |   |-- log4j.properties          # 日志配置文件</span></span>
<span class="line"><span>    |   |   |-- spring-mybatis.xml        # Spring Mybatis 配置文件</span></span>
<span class="line"><span>    |   |   \`-- static                    # 存放静态资源的目录</span></span>
<span class="line"><span>    |   |       |-- css                   # 存放 CSS 文件的目录</span></span>
<span class="line"><span>    |   |       |-- js                    # 存放 JavaScript 文件的目录</span></span>
<span class="line"><span>    |   |       \`-- images                # 存放图片资源的目录</span></span>
<span class="line"><span>    |   \`-- webapp                        # 存放 WEB 相关配置和资源</span></span>
<span class="line"><span>    |       |-- WEB-INF                   # 存放 WEB 应用配置文件</span></span>
<span class="line"><span>    |       |   |-- web.xml               # Web 应用的部署描述文件</span></span>
<span class="line"><span>    |       |   \`-- classes               # 存放编译后的 class 文件</span></span>
<span class="line"><span>    |       \`-- index.html                # Web 应用入口页面</span></span>
<span class="line"><span>    \`-- test                              # 项目测试代码</span></span>
<span class="line"><span>        |-- java                          # 单元测试目录</span></span>
<span class="line"><span>        \`-- resources                     # 测试资源目录</span></span></code></pre></div>`,18),i=[l];function t(c,o,r,d,h,g){return s(),n("div",null,i)}const m=a(e,[["render",t]]);export{v as __pageData,m as default};
