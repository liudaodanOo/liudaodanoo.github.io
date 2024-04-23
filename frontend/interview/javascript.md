# 关于原生JS的面试题

## 什么是事件流？

事件流描述的是页面中事件传递的过程。分为三个阶段。

1. 捕获阶段（Capture Phase）：事件以从Window到目标父对象的顺序，在事件对象的祖先中传播
2. 触发阶段（Target Phase）：事件对象到达事件对象的目标。如果<span hl-txt-1>Event.bubbles = false</span>，对事件对象的处理在这个阶段后就会结束
3. 冒泡阶段（Bubble Phase）：事件以相反的顺序在事件对象的祖先中传播，从目标父对象到Window

![image.svg](/images/interview/eventflow.svg)

> 如何取消事件冒泡？

`event.stopPropagation()`或`event.cancelBubble = true（兼容）`

```javascript
ele.onclick = function (event) {
	event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
};
```

> 如何在捕获阶段触发事件？

`target.addEventListener(handler, { capture: true })`

<span hl-bg-1>参考链接：</span>

- [W3C #event-flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
- [MDN #event.cancelBubble](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelBubble)
- [MDN #event.stopPropagation](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)
- [MDN #event.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

## 闭包
