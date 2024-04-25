# 关于原生JS的面试题

## 什么是事件流？

**事件流**描述的是页面中事件传递的过程。分为三个阶段。

1. 捕获阶段（Capture Phase）：事件以从Window到目标父对象的顺序，在事件对象的祖先中传播
2. 触发阶段（Target Phase）：事件对象到达事件对象的目标。如果<span hl>Event.bubbles = false</span>，对事件对象的处理在这个阶段后就会结束
3. 冒泡阶段（Bubble Phase）：事件以相反的顺序在事件对象的祖先中传播，从目标父对象到Window

![image.svg](/images/interview/eventflow.svg)

> **如何取消事件冒泡？**

`event.stopPropagation()`或`event.cancelBubble = true（兼容）`

```javascript
ele.onclick = function (event) {
	event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
};
```

> **如何在捕获阶段触发事件？**

`target.addEventListener(handler, { capture: true })`

<span hlbg>参考链接：</span>

- [W3C #event-flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
- [MDN #event.cancelBubble](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelBubble)
- [MDN #event.stopPropagation](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)
- [MDN #event.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

## 什么是闭包？

**闭包**是一个函数和其词法环境的组合。子函数引用了父函数中的局部变量，导致父函数执行完作用域不会随之销毁，仍可通过子函数访问/操作父函数中的局部变量，这种现象称为“闭包”。

```javascript
function parentFunc() {
	let name = 'Parent';

	return function childFunc() {
		console.log(name);
	};
}

const myFunc = parentFunc();
myFunc(); // Parent
```

> **闭包的作用是什么？**

1. 可以模拟私有变量和模块化，避免命名冲突和全局污染
2. 可以缓存数据

> **闭包可能会引起哪些问题？如何解决？**

1. 内存泄漏：由于闭包引用了外部函数的局部变量，外部函数的作用域并不会因外部函数执行完后随之销毁，导致引用的外部局部变量无法销毁，一直占用内存。所以滥用闭包可能会引起内存泄漏问题。
2. 性能问题：闭包中访问外部函数的变量需要通过作用域链查找，如果闭包层数较深，作用域链就会很长，影响函数的执行效率。

<i>解决方法：</i>

1. 使用完闭包后，及时释放，手动将其赋值为null
2. 减少闭包层数
3. 使用模块化编程

## Babel如何编译let和const？

Babel会将let和const都编译成<span hl>var</span>

1. 块级作用域中的let和const

```javascript
{
	let foo = 'foo';
	const bar = 'bar';
}
console.log('foo', foo); // Uncaught ReferenceError: foo is not defined
console.log('bar', bar); // Uncaught ReferenceError: bar is not defined
```

<i>编译后：</i>

```javascript
{
	var _foo = 'foo';
	var _bar = 'bar';
}
console.log('foo', foo); // Uncaught ReferenceError: foo is not defined
console.log('bar', bar); // Uncaught ReferenceError: bar is not defined
```

Babel编译后会改变let和const定义的变量名。

2. 对const定义的变量赋值

Babel会创建一个<span hl>\_readOnlyError</span>方法，赋值操作变成了调用\_readOnlyError方法。

```javascript
const foo = 'foo';
foo = 'bar'; // Uncaught TypeError: Assignment to constant variable.
```

<i>编译后：</i>

```javascript
function _readOnlyError(name) {
	throw new TypeError('"' + name + '" is read-only');
}

var foo = 'foo';
'bar', _readOnlyError('foo'); // Uncaught TypeError: "foo" is read-only
```

3. for循环中的let

Babel编译后会创建一个<span hl>\_loop</span>函数，利用<span hl>闭包</span>保存索引的值。

```javascript
let functions = [];
for (var i = 0; i < 3; i++) {
	functions[i] = function () {
		console.log(i);
	};
}

functions[0](); // 0
```

<i>编译后：</i>

```javascript
var functions = [];
var _loop = function _loop(i) {
	functions[i] = function () {
		console.log(i);
	};
};

functions[0](); // 0
```
