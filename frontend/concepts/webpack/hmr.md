# 模块热替换 - HMR(Hot Module Replacement)

<span hl>HMR</span>会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面。其主要通过一下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面期间丢失的应用程序状态
- 只更新变更内容，以节省宝贵的开发时间
- 在源代码中CSS/JS产生修改时，会立即在浏览器中进行更新，这几乎相当于在浏览器devtools直接修改样式

## 应用

通过以下步骤，可以让应用程序中的模块被置换：

1. 应用程序要求<span hl>HMR runtime</span>检查更新

2. HMR runtime异步下载需更新的模块，然后通知应用程序

3. 应用程序要求HMR runtime更新模块

4. HMR runtime同步更新模块

## Compiler

除了一些普通资源，compiler需要发出`update`，将旧版本更新到新版本。`update`由两部分组成：

- 更新后的<span hl>manifest</span>
- 一个或多个更新后的chunk

manifest包括新的compilation hash和所有更新后的chunk列表。每个chunk都包含全部更新模块的最新代码（或一个标记此模块需被移除的flag）。

compiler会确保在这些构建中的模块id和chunk id保持一致。通常将这些id存储在内存中，也有可能将它们存在一个JSON文件中。

## 模块

在模块中可以通过实现HMR接口，描述当模块更新后发生了什么。

大多数情况下，不需要在每个模块中强行写入HMR代码。如果一个模块没有HMR处理函数，更新就会<span hl>冒泡</span>。这意味着某个单独处理函数能够更新整个模块树。如果在模块树的一个单独模块被更新，那么整组依赖模块都会被重新加载。

## Runtime

模块系统运行时（module system runtime）会通过额外的代码跟踪模块<span hl>parents</span>和<span hl>children</span>的关系。在管理方面，runtime支持两个方法`check`和`apply`。

`check`方法，会发送一个HTTP请求来更新manifest。如果请求失败，说明没有可用更新。如果请求成功，会将已更新的chunk列表与当前已加载的chunk列表进行比较。每个已加载的chunk都会下载相应的已更新的chunk。当所有chunk都下载完成后，runtime将切换到<span hl>ready</span>状态。

`apply`方法，会将所有已更新的模块标记为无效。每个无效的模块都需有一个<span hl>update handler</span>，或者在其父模块中有update handler。否则会进行无效标记冒泡，并且父级也会被标记为无效。继续每个冒泡，直到到达最近的含有update handler的模块，随后结束冒泡。若冒泡一直未停则，则最终会到达应用程序入口起点。

最后，所有无效的模块都会通过<span hl>dispose handler</span>处理和卸载。然后更新当前hash，并且调用所有<span hl>accept handler</span>。runtime切换为<span hl>idle</span>状态，如此往复。

<span hlbg>参考链接：</span>

- [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
