import{_ as o,o as s,c as n,R as t,k as e,a}from"./chunks/framework.S8W019Nk.js";const A=JSON.parse('{"title":"The build process","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/concepts/webpack/buildprocess.md","filePath":"frontend/concepts/webpack/buildprocess.md"}'),l={name:"frontend/concepts/webpack/buildprocess.md"},d=t('<h1 id="the-build-process" tabindex="-1">The build process <a class="header-anchor" href="#the-build-process" aria-label="Permalink to &quot;The build process&quot;">​</a></h1><h2 id="step-1-modules-dependencies-graph" tabindex="-1">Step 1. Modules dependencies graph <a class="header-anchor" href="#step-1-modules-dependencies-graph" aria-label="Permalink to &quot;Step 1. Modules dependencies graph&quot;">​</a></h2><p>Each import is treated as a module.</p><p>Each module contains imports it needs.</p><p>Generate dependencies&#39; tree.</p><h2 id="step-2-chunk-graph" tabindex="-1">Step 2. Chunk graph <a class="header-anchor" href="#step-2-chunk-graph" aria-label="Permalink to &quot;Step 2. Chunk graph&quot;">​</a></h2>',6),i=e("p",null,[e("span",{hl:""},"Chunk graph"),a(" is the kind of how webpack splits the application into parts.")],-1),r=e("p",null,"Each chunk contains the modules it needs.",-1),p=e("h2",{id:"step-3-optimization-available-modules",tabindex:"-1"},[a("Step 3. Optimization available modules "),e("a",{class:"header-anchor",href:"#step-3-optimization-available-modules","aria-label":'Permalink to "Step 3. Optimization available modules"'},"​")],-1),c=e("p",null,"Get all modules and create available modules list.",-1),h=e("p",null,"An available module must be a ESM module and synchronous.",-1),u=e("h2",{id:"step-4-concatenate-modules",tabindex:"-1"},[a("Step 4. Concatenate modules "),e("a",{class:"header-anchor",href:"#step-4-concatenate-modules","aria-label":'Permalink to "Step 4. Concatenate modules"'},"​")],-1),_=e("p",null,"Try all dependencies optionally.",-1),m=e("p",null,[e("span",{hl:""},"Hoist module scope and delete duplicated modules"),a(".")],-1),b=t('<h2 id="step-5-ids" tabindex="-1">Step 5. Ids <a class="header-anchor" href="#step-5-ids" aria-label="Permalink to &quot;Step 5. Ids&quot;">​</a></h2><p>Give every module and every chunk an numeric id. More often used modules get a smaller id and less often used modules get a higher id.</p><h2 id="step-6-code-generation" tabindex="-1">Step 6. Code generation <a class="header-anchor" href="#step-6-code-generation" aria-label="Permalink to &quot;Step 6. Code generation&quot;">​</a></h2><p>Generate code for all modules. Inject runtime code into entry-point chunks. Wrap each module into a function and pass <code>__magic__(__webpack_require__)</code> function and exports object into the module.</p><h2 id="step-7-assets" tabindex="-1">Step 7. Assets <a class="header-anchor" href="#step-7-assets" aria-label="Permalink to &quot;Step 7. Assets&quot;">​</a></h2><p>Generate assets.</p>',6),f=e("p",null,[e("span",{hlbg:""},"参考链接：")],-1),k=e("ul",null,[e("li",null,[e("a",{href:"https://www.youtube.com/watch?v=UNMkLHzofQI",target:"_blank",rel:"noreferrer"},"Manually Bundling an Application")]),e("li",null,[e("a",{href:"https://github.com/sokra/webpack-meetup-2018-05",target:"_blank",rel:"noreferrer"},"Demo code above")])],-1),g=[d,i,r,p,c,h,u,_,m,b,f,k];function S(T,P,q,v,x,w){return s(),n("div",null,g)}const y=o(l,[["render",S]]);export{A as __pageData,y as default};
