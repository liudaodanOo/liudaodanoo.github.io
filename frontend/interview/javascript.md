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

## 什么是对象原型？

每个Javascript对象都有一个内置属性，称为它的**原型**。原型是对象互相继承特性的机制。

> **什么是原型链？**

每个Javascript对象都有原型，原型本身也是一个对象，所以原型有它自己的原型，这样逐渐形成了**原型链**。原型链终止于拥有null作为其原型的对象上。

Javascript中所有对象都继承于Object.prototype。

```javascript
console.log(Object.prototype.__proto__); // null
console.log({}.__proto__.__proto__); // null
console.log({}.__proto__ === Object.prototype); // true
```

> **如何创建一个没有原型的对象**

`Object.create(null)`

```javascript
const pureObj = Object.create(null);
console.log(pureObj.__proto__); // undefined
```

## 什么是作用域？

**作用域**是当前的执行上下文，变量和表达式在其中可被访问。

> **有几种作用域？**

1. 全局作用域
2. 模块作用域
3. 函数作用域
4. 其他

   - 块级作用域

> **什么是作用域链？**

在JS中使用变量时，JS引擎会先在当前作用域查找变量值。如果无法找到变量，它将会到外部作用域中查找，直到找到变量或到达全局作用域。如果全局作用域中仍然找不到该变量，则会报错。

<span hlbg>参考链接：</span>

- [MDN #scope](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)
- [Understanding scope and scope chain in Javascript](https://blog.bitsrc.io/understanding-scope-and-scope-chain-in-javascript-f6637978cf53)

## 什么是闭包？

**闭包**是一个函数和其词法环境的组合。子函数引用了父函数中的局部变量，导致父函数执行完作用域不会随之销毁，仍可通过子函数访问父函数中的局部变量，这种现象称为“闭包”。

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

<span hlbg>参考链接：</span>

- [MDN #closure](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

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
for (var i = 0; i < 3; i++) {
	_loop(i);
}

functions[0](); // 0
```
