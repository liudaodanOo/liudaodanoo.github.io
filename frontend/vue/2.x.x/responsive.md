# 响应式原理

响应式原理核心是三个类：`Dep(依赖收集者)、Watcher(观察者)、Observer(可观测对象)`。

## Dep

`Dep` 会在对象转换成 `Observer`时创建。用于保存 `Watcher` ，通知 `Watcher` 更新。

```typescript
class Dep {
	static target?: DepTarget | null; // 指向当前的观察者
	subs: Array<DepTarget | null>; // 收集的观察者

	constructor() {
		this.subs = [];
	}

	// 添加观察者
	addSub(sub: DepTarget) {
		this.subs.push(sub);
	}

	// 移除观察者
	removeSub(sub: DepTarget) {
		this.subs[this.subs.indexOf(sub)] = null;
	}

	// 观察者收集依赖
	depend() {
		Dep.target.addDep(this);
	}

	// 通知观察者更新
	notify() {
		const subs = this.subs.filter((s) => s) as DepTarget[];
		for (let i = 0, l = subs.length; i < l; i++) {
			const sub = subs[i];
			sub.update();
		}
	}
}
```

## Watcher

`Watcher` 分为：

- renderWatcher(根观察者)：vm.\_watcher
- 非renderWatcher
  - computedWatcher(计算属性的观察者)：vm.\_computedWatcher
  - vm.prototype.$watch创建的观察者，没有保存在vm对象上，而是返回了一个从依赖的观察者数组中移除该观察者的方法

这里只讨论 `renderWatcher` ，它在 `vm.$mount` 时创建，在 `beforeMount` 与 `mounted` 中间这段时期创建。

```typescript
export default class Watcher implements DepTarget {
	vm?: Component | null; // 对应的vue实例
	cb: Function; // 观察者更新的回调
	deps: Array<Dep>; // 旧的依赖数组
	newDeps: Array<Dep>; // 新的依赖数组
	depIds: SimpleSet;
	newDepIds: SimpleSet;
	before?: Function; // 对于renderWatcher来说，before中执行的是beforeUpdate hook
	getter: Function; // getter方法，对于renderWatcher来说是vm._update方法
	value: any; // 值，可用来与新值对比

	constructor(
		vm: Component | null,
		expOrFn: string | (() => any),
		cb: Function,
		options?: WatcherOptions | null, // 配置项：before、deep、lazy等等，对于renderWatcher来说只有before配置项
		isRenderWatcher?: boolean // 是否是vm的根观察者
	) {
		if ((this.vm = vm) && isRenderWatcher) {
			vm._watcher = this;
		}

		this.before = options.before;
		this.cb = cb;
		this.deps = [];
		this.newDeps = [];
		this.depIds = new Set();
		this.newDepIds = new Set();
		this.getter = expOrFn as Function;

		// 调用get，获取value，并缓存
		this.value = this.get();
	}

	// 重新收集依赖，并计算新的值
	get() {
		// 将Dep的静态属性target指向当前观察者
		pushTarget(this);
		let value;
		const vm = this.vm;
		// 更新方法（对于renderWatcher来说是vm._update方法）
		value = this.getter.call(vm, vm);
		// 将Dep的静态属性target指向上一个观察者
		popTarget();
		// 清除无关的依赖
		this.cleanupDeps();
		return value;
	}

	// 添加依赖
	addDep(dep: Dep) {
		const id = dep.id;
		if (!this.newDepIds.has(id)) {
			this.newDepIds.add(id);
			this.newDeps.push(dep);
			if (!this.depIds.has(id)) {
				// 将当前观察者添加到依赖的订阅者数组中
				dep.addSub(this);
			}
		}
	}

	// 清除旧依赖，并将新依赖添加进来
	cleanupDeps() {
		let i = this.deps.length;
		while (i--) {
			const dep = this.deps[i];
			if (!this.newDepIds.has(dep.id)) {
				dep.removeSub(this);
			}
		}
		let tmp: any = this.depIds;
		this.depIds = this.newDepIds;
		this.newDepIds = tmp;
		this.newDepIds.clear();
		tmp = this.deps;
		this.deps = this.newDeps;
		this.newDeps = tmp;
		this.newDeps.length = 0;
	}

	// 更新
	update() {
		// 将当前观察者添加到队列中
		// 并使用nextTick依次异步调用watcher.before、watcher.run方法
		queueWatcher(this);
	}

	// 执行对应的回调
	run() {
		const value = this.get();
		if (
			value !== this.value || // 缓存的值（computed缓存的原理）
			isObject(value)
		) {
			const oldValue = this.value;
			this.value = value;
			// 调用回调方法
			this.cb.call(this.vm, value, oldValue);
		}
	}
}
```

## Observer

`Observer` 有两个作用：

- 对于数组：通过**修改数组的原型（有proto属性）** 或 **作为数组对象的新属性（无proto属性）** 将重写的方法添加到数组对象上
- 对于对象：通过 `Object.defineProperty` 给目标属性添加拦截器
  - 在get中调用 `dep.depend` 添加观察者
  - 在set中调用 `dep.notify` 遍历观察者，通知观察者更新

```typescript
class Observer {
	dep: Dep;

	constructor(value: any, shallow = false) {
		// 创建当前可观测对象对应的依赖实例
		this.dep = new Dep();
		// 在当前对象上添加__ob__，表示该对象已转为了可观测对象
		def(value, '__ob__', this);

		if (isArray(value)) {
			// 观测数组变化
			if (hasProto) {
				// 有原型：修改隐式原型__proto__的指向
				// 将数组实例的__proto__指向新创建的劫持数组原生方法的函数
				(value as any).__proto__ = arrayMethods;
			} else {
				// 无原型：注入
				// 根据新创建的劫持数组原生方法的函数，在数组实例上创建新的属性，
				for (let i = 0, l = arrayKeys.length; i < l; i++) {
					const key = arrayKeys[i];
					def(value, key, arrayMethods[key]);
				}
			}

			if (!shallow) {
				// 遍历数组的元素，将其转成可观测对象
				this.observeArray(value);
			}
		} else {
			// 观测对象的变化
			const keys = Object.keys(value);
			// 遍历对象的属性
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				// 1. 给目标属性创建对应的依赖实例
				// 2. 通过Object.defineProperty给目标属性添加拦截器
				//  2.1 在get中调用dep.depend添加观察者
				//  2.2 在set中调用dep.notify遍历观察者，通知观察者更新
				defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock);
			}
		}
	}

	/**
	 * Observe a list of Array items.
	 */
	// 遍历数组的元素，将其转成可观测对象
	observeArray(value: any[]) {
		for (let i = 0, l = value.length; i < l; i++) {
			// 通过Observer类，将数组元素转成可观测对象
			observe(value[i], false);
		}
	}
}
```

## 流程图

![image.png](/images/vue/vue-2.0-responsive.png)
