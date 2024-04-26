# 遇到的关于Javascript的一些问题 & 解决方法

## 浏览器

### window.open为什么会复制sessionStorage？

根据 `HTML规范`:

- window.open会将<span hl>原文档(sourceDocument)</span>作为新打开窗口的全局对象的<span hl>关联文档</span>。
- 获取sessionStorage时，如果<span hl>关联文档</span>的sessionStorage不为空，则复制一份关联文档的sessionStorage并返回。

> 想要打开新窗口时不复制sessionStorage该如何做？

使用`a标签`跳转：

```html
<a href="example.com" target="_blank">Example</a>
```

<span hlbg>参考链接：</span>

- [HTML规范 #dom-open-dev](https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-open-dev)
- [HTML规范 #dom-sessionstorage-dev](https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage-dev)
