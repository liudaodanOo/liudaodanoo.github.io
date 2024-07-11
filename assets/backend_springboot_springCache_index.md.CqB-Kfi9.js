import{_ as n,o as s,c as t,R as i,k as a,a as l}from"./chunks/framework.S8W019Nk.js";const P=JSON.parse('{"title":"Spring Cache","description":"","frontmatter":{},"headers":[],"relativePath":"backend/springboot/springCache/index.md","filePath":"backend/springboot/springCache/index.md"}'),e={name:"backend/springboot/springCache/index.md"},h=i(`<h1 id="spring-cache" tabindex="-1">Spring Cache <a class="header-anchor" href="#spring-cache" aria-label="Permalink to &quot;Spring Cache&quot;">​</a></h1><p><strong>Spring Cache</strong> 是Spring提供的一整套的缓存解决方案，它不是具体的缓存实现，它只提供一整套的接口和代码规范、配置、注解等，用于整合各种缓存方案，比如Redis、Caffeine、Guava Cache、Ehcache。使用注解方式替代原有硬编码方式缓存，语法更加简单优雅。</p><h2 id="spring-cache注解" tabindex="-1">Spring Cache注解 <a class="header-anchor" href="#spring-cache注解" aria-label="Permalink to &quot;Spring Cache注解&quot;">​</a></h2><h3 id="enablecaching" tabindex="-1">@EnableCaching <a class="header-anchor" href="#enablecaching" aria-label="Permalink to &quot;@EnableCaching&quot;">​</a></h3><p>需要在启动类添加<b>@EnableCaching</b>注解，开启缓存支持。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">MapperScan</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;com.liudaodan.mapper&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">EnableCaching</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DemoApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SpringApplication.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(DemoApplication.class, args);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="cacheable" tabindex="-1">@Cacheable <a class="header-anchor" href="#cacheable" aria-label="Permalink to &quot;@Cacheable&quot;">​</a></h3><p><b>@Cacheable</b>注解可添加到方法和类上。调用方法时会查询是否有缓存：有，则直接走缓存；无，则走方法，并缓存方法的返回值。</p><p>参数：</p>`,9),c=a("table",null,[a("thead",null,[a("tr",null,[a("th",null,"参数名"),a("th",null,"作用")])]),a("tbody",null,[a("tr",null,[a("td",null,"value"),a("td",null,"配置缓存的分区（模块），相当于缓存的标识")]),a("tr",null,[a("td",null,"key"),a("td",null,[l("缓存分区（模块）下的具体标识，支持根据"),a("span",{hl:""},"SpringEL"),l("表达式动态命名")])]),a("tr",null,[a("td",null,"cacheManager"),a("td",null,"选择配置类中的缓存配置对象，不选则走默认")]),a("tr",null,[a("td",null,"condition"),a("td",null,[l("注解生效的条件，支持"),a("span",{hl:""},"SpringEL"),l("表达式")])])])],-1),p=a("h3",{id:"cacheput",tabindex:"-1"},[l("@CachePut "),a("a",{class:"header-anchor",href:"#cacheput","aria-label":'Permalink to "@CachePut"'},"​")],-1),r=a("p",null,[a("b",null,"@CachePut"),l("注解可添加到方法和类上。使用方法的返回值对制定的key更新，通常添加到修改方法上。")],-1),d=a("p",null,"参数：",-1),o=a("table",null,[a("thead",null,[a("tr",null,[a("th",null,"参数名"),a("th",null,"作用")])]),a("tbody",null,[a("tr",null,[a("td",null,"value"),a("td",null,"配置缓存的分区（模块），相当于缓存的标识")]),a("tr",null,[a("td",null,"key"),a("td",null,[l("缓存分区（模块）下的具体标识，支持根据"),a("span",{hl:""},"SpringEL"),l("表达式动态命名")])]),a("tr",null,[a("td",null,"cacheManager"),a("td",null,"选择配置类中的缓存配置对象，不选则走默认")]),a("tr",null,[a("td",null,"condition"),a("td",null,[l("注解生效的条件，支持"),a("span",{hl:""},"SpringEL"),l("表达式")])])])],-1),k=a("h3",{id:"cacheevict",tabindex:"-1"},[l("@CacheEvict "),a("a",{class:"header-anchor",href:"#cacheevict","aria-label":'Permalink to "@CacheEvict"'},"​")],-1),u=a("p",null,[a("b",null,"@CacheEvict"),l("注解可添加到方法和类上。删除指定key的数据，通常添加到删除方法上。")],-1),g=a("p",null,"参数：",-1),E=a("table",null,[a("thead",null,[a("tr",null,[a("th",null,"参数名"),a("th",null,"作用")])]),a("tbody",null,[a("tr",null,[a("td",null,"value"),a("td",null,"配置缓存的分区（模块），相当于缓存的标识")]),a("tr",null,[a("td",null,"key"),a("td",null,[l("缓存分区（模块）下的具体标识，支持根据"),a("span",{hl:""},"SpringEL"),l("表达式动态命名")])]),a("tr",null,[a("td",null,"cacheManager"),a("td",null,"选择配置类中的缓存配置对象，不选则走默认")]),a("tr",null,[a("td",null,"condition"),a("td",null,[l("注解生效的条件，支持"),a("span",{hl:""},"SpringEL"),l("表达式")])]),a("tr",null,[a("td",null,"allEntries"),a("td",null,"是否删除缓存中的所有条目")])])],-1),b=i('<h3 id="caching" tabindex="-1">@Caching <a class="header-anchor" href="#caching" aria-label="Permalink to &quot;@Caching&quot;">​</a></h3><p><b>@Caching</b>注解可添加到方法和类上。可以包含上面三个注解，用于复杂的缓存策略。</p><p>参数：</p><table><thead><tr><th>参数名</th><th>作用</th></tr></thead><tbody><tr><td>cacheable</td><td>@Cacheable[]</td></tr><tr><td>put</td><td>@CachePut[]</td></tr><tr><td>evict</td><td>@CacheEvict[]</td></tr></tbody></table><h2 id="整合" tabindex="-1">整合 <a class="header-anchor" href="#整合" aria-label="Permalink to &quot;整合&quot;">​</a></h2><ul><li><a href="/backend/springboot/springCache/redis.html">Redis</a></li></ul>',6),_=[h,c,p,r,d,o,k,u,g,E,b];function C(y,m,S,v,A,F){return s(),t("div",null,_)}const x=n(e,[["render",C]]);export{P as __pageData,x as default};
