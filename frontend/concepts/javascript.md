# 关于原生JS的概念

## 什么是事件流？

**事件流**描述的是页面中事件传递的过程。分为三个阶段。

1. 捕获阶段（Capture Phase）：事件以从Window到目标父对象的顺序，在事件对象的祖先中传播
2. 触发阶段（Target Phase）：事件对象到达事件对象的目标。如果<span hl>Event.bubbles = false</span>，对事件对象的处理在这个阶段后就会结束
3. 冒泡阶段（Bubble Phase）：事件以相反的顺序在事件对象的祖先中传播，从目标父对象到Window

![image.svg](/images/concepts/eventflow.svg)

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

> **什么是显示原型、什么是隐式原型？**

**显示原型**：[Constructor].prototype

**隐式原型**：实例的[[Prototype]]属性，即[instance].\_\_proto\_\_

[instance].\_\_proto\_\_指向[Constructor].prototype。

<span hlbg>参考链接：</span>

- [MDN #Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

## 什么是作用域？

**作用域**是当前的执行上下文，变量和表达式在其中可被访问。

> **有几种作用域？**

1. 全局作用域
2. 模块作用域
3. 函数作用域
4. 其他

   - 块级作用域

> **什么是作用域链？**

**作用域链**是JS中用于查找变量或函数的一种机制。在JS中使用变量时，JS引擎会先在当前作用域查找变量值。如果无法找到变量，它将会到外部作用域中查找，直到找到变量或到达全局作用域。如果全局作用域中仍然找不到该变量，则会报错。

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

## 谈谈你对this的理解

**this**是关联一段代码的上下文的关键词。

<span hl>普通函数</span>中this的值由该函数的调用方式决定，在运行时绑定。

- 作为单独的函数调用，this通常指向全局对象（非严格模式）或undefined（严格模式）

- 作为对象的函数调用时，this指向这个对象

<span hl>箭头函数</span>中this的值会在定义时从其父作用域的this继承。所以箭头函数无法通过Function.prototype.call、Function.prototype.apply、Function.prototype.bind修改this。

<span hl>构造函数</span>中this会绑定到构造的新对象，除非构造函数返回其他非原始值。

<span hl>全局上下文</span>中this的值会根据运行时的环境确定（调用者）。在脚本的顶层，无论是否严格模式，this都指向全局对象。若脚本被当作模块加载，则this的值为undefined。

> **如何修改this的指向？**

call、apply、bind，对于普通函数还可以通过作为对象的函数调用改变this指向。

> **this的优先级？**

通过call、apply、bind、new进行this绑定的情况称为**显示绑定**。

通过对象调用关系确定this指向的情况称为**隐式绑定**。

它们的优先级由高到低分别为：<span hl>new > call、apply、bind > 隐式绑定</span>。

> **call、apply、bind的区别是什么？**

它们都是用来改变函数this指向的。

call和apply会改变函数this指向的同时，调用函数。call接收给定的this值和单独传递的参数。apply接收给定的this值和一个参数数组。

bind接收给定的this值和单独传递的参数，它不会调用原函数，而会创建一个新的函数并返回。bind还可以用来固定一些参数。

```javascript
function func() {
	console.log(this.name + ' ' + [...arguments]);
}
const obj = {
	name: 'foo',
};

func.call(obj, 1, 2, 3, 4); // foo 1,2,3,4
func.apply(obj, [1, 2, 3, 4]); // foo 1,2,3,4

const newFunc = func.bind(obj, 1, 2, 3, 4);
newFunc(); // foo 1,2,3,4
newFunc(5, 6, 7, 8); // foo 1,2,3,4,5,6,7,8
```

<span hlbg>参考链接：</span>

- [MDN #this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [MDN #call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN #apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [MDN #bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## new操作符具体做了什么？

**new操作符**允许我们实例化一个内置类型或自定义类型的对象。new操作符会依次做如下几件事情：

1. 创建一个空的JS对象：**newInstance**
2. 将newInstance.\_\_proto\_\_指向构造函数的prototype
3. 将this指向newInstance，根据传入的参数执行构造函数
4. 如果没有显示指定返回值，则返回newInstance；如果显示指定了返回的对象（非基本类型），则返回指定的对象

<span hlbg>参考链接：</span>

- [MDN #new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

## 什么是函数柯里化？

**柯里化**（Currying）是一种用于改造多参函数的技术。将多参函数分成多个接收单一参数的函数，并依次返回。
柯里化不仅被用于Javascript，还被用于其他变成语言。

```javascript
const add = (num1, num2, num3) => {
	return num1 + num2 + num3;
};
add(1, 2, 3); // 6
```

<i>柯里化后：</i>

```javascript
const curryingAdd = (num1) => {
	return (num2) => {
		return (num3) => {
			return num1 + num2 + num3;
		};
	};
};
curryingAdd(1)(2)(3); // 6
```

通过以上代码可能还是无法体会到柯里化的好处，那么看看如下代码呢：

```javascript
//校验手机号
const regexpValidate = (regexp, warn, phone) => {
	if (phone && !regexp.test(phone)) {
		return Promise.reject(warn);
	}
	return Promise.resolve();
};

//调用校验
regexpValidate(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '手机号格式不符', '187****0000');

// 如果有多个号码，则
regexpValidate(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '手机号格式不符', '187****0001');
regexpValidate(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '手机号格式不符', '187****0002');
regexpValidate(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '手机号格式不符', '187****0003');
regexpValidate(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, '手机号格式不符', '187****0004');
```

正则、提示信息是固定的值。但每次调用regexpValidate()都需要传入正则、提示信息，显得很冗余。

```javascript
const regexpValidateCurrying = (regExp) => {
	return (warn) => {
		return (val) => {
			if (val && !regExp.test(val)) {
				return Promise.reject(warn);
			}

			return Promise.resolve();
		};
	};
};

const validatePhone = regexpValidateCurrying(
	/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/,
	'手机号格式不符'
);

// 多个号码
validatePhone('187****0000');
validatePhone('187****0001');
validatePhone('187****0002');
validatePhone('187****0003');
validatePhone('187****0004');
```

通过柯里化创建validatePhone()专门用于手机号校验，使用起来更加简洁方便。

> 柯里化的作用是什么？

1. 提高函数的可复用性和可读性，方便进行模块化开发
2. 可以生成一系列的新函数，增加代码的灵活性和可扩展性
3. 简化复杂的函数调用，使代码更易于理解和维护

> 柯里化和偏函数的区别（什么是偏函数、偏应用函数）？

柯里化是将一个多参函数转换为多个单一参数函数的技术。

**偏函数**则是固定一个函数的一部分参数，返回一个新的函数等待剩余参数的传入。

```javascript
// 使用偏函数固定参数
const validatePhoneNew = regexpValidate.bind(
	null,
	/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/,
	'手机号格式不符'
);

// 多个号码
validatePhoneNew('187****0000');
validatePhoneNew('187****0001');
validatePhoneNew('187****0002');
validatePhoneNew('187****0003');
validatePhoneNew('187****0004');
```

> 什么是高阶函数？

把函数作为参数传入，这样的函数称为**高阶函数**。常见的高阶函数：Array.prototype.forEach()、Array.prototype.map()、setTimeout()、setInterval()、Promise.prototype.then()。

<span hlbg>参考链接：</span>

- [Javascript高级篇之函数柯里化](https://juejin.cn/post/7111902909796712455)
- [JavaScript中的函数柯里化](https://docs.pingcode.com/ask/89142.html)
- [一文讲懂什么是函数柯里化，柯里化的目的及其代码实现](https://cloud.tencent.com/developer/article/1794267)
