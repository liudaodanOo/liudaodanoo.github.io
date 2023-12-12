# 导航的流程

我将导航的流程分为了三个阶段：

## 初始化阶段

1. 根据配置创建、返回带有install函数的router对象
2. 执行install函数，注册RouterView组件，将表示当前路由的响应式对象提供给后代组件
3. 在RouterView组件中注入currentRouter，观察currentRouter的变化

## 路由切换阶段

1. 通过匹配器匹配对应的路由
2. 触发路由守卫
3. 修改 currentRouter

## 更新页面阶段

1. 根据 currentRouter 找到需要渲染的组件
2. 通过渲染函数h创建组件的 vnode ，并返回

## 三种路由模式

三种路由模式都是创建了一个行为相同的对象，暴露了相同的属性、方法。

### 1. history

`history模式`使用 `createWebHistory` 函数创建。主要通过 `history.pushState、history.replaceState` 修改历史栈的状态，在 `Safari浏览器`中的一些场景中还会使用 `location.replace、location.assign`

> `Safari浏览器` 中在30s内执行 `history.pushState、history.replaceState` **100次** 会抛出一个安全错误。`VueRouter` 会捕获这个错误，通过 `location.replace、location.assign` 函数修改地址栏，并重置次数

```typescript
// Step: 1. 创建基于h5 history的history对象
export function createWebHistory(base?: string): RouterHistory {
	// Step: 1.1 标准化base路径，将协议、域名、末位的/去除
	base = normalizeBase(base);

	// Step: 1.2 当前路由、路由的状态、push以及replace方法
	// 对于push利用的是history.pushState
	// 对于replace利用的是history.replaceState
	// Safari浏览器中history的pushState、replaceState在30s中调用100次会抛一个安全错误
	// 故捕获到此错误是还利用了location的replace、assign函数改变url，重置调用的次数
	const historyNavigation = useHistoryStateNavigation(base);

	// Step: 1.3 创建了一个存放callback的数组。当监听到popState事件时，遍历并执行数组中的callback
	const historyListeners = useHistoryListeners(
		base,
		historyNavigation.state,
		historyNavigation.location,
		historyNavigation.replace
	);
	function go(delta: number, triggerListeners = true) {
		if (!triggerListeners) historyListeners.pauseListeners();
		history.go(delta);
	}

	// Step: 1.4 创建routerHistory对象
	const routerHistory: RouterHistory = assign(
		{
			location: '',
			base,
			go,
			createHref: createHref.bind(null, base),
		},

		historyNavigation,
		historyListeners
	);

	// Tips: 代理
	Object.defineProperty(routerHistory, 'location', {
		enumerable: true,
		get: () => historyNavigation.location.value,
	});

	Object.defineProperty(routerHistory, 'state', {
		enumerable: true,
		get: () => historyNavigation.state.value,
	});

	// Step: 1.5 返回routerHistory对象
	return routerHistory;
}
```

### 2. hash

`hash模式` 与 `history` 模式实现原理相同，只不过地址栏增加了#

### 3. abstract

`abstract模式` 是我延用的vue2中的叫法，可在不支持浏览器api环境中使用。使用 `createMemoryHistory` 函数创建。本质是创建一个维护历史记录的对象。

```typescript
// Step: 1. 创建基于内存的（手动创建一个对象，维护历史记录）history对象
export function createMemoryHistory(base: string = ''): RouterHistory {
	// 保存回调
	let listeners: NavigationCallback[] = [];
	// 历史记录
	let queue: HistoryLocation[] = [START];
	// 位置
	let position: number = 0;

	// Step: 1.1 标准化base路径，将协议、域名、末位的/去除
	base = normalizeBase(base);

	function setLocation(location: HistoryLocation) {
		position++;
		if (position === queue.length) {
			queue.push(location);
		} else {
			queue.splice(position);
			queue.push(location);
		}
	}

	function triggerListeners(
		to: HistoryLocation,
		from: HistoryLocation,
		{ direction, delta }: Pick<NavigationInformation, 'direction' | 'delta'>
	): void {
		const info: NavigationInformation = {
			direction,
			delta,
			type: NavigationType.pop,
		};
		for (const callback of listeners) {
			callback(to, from, info);
		}
	}

	// Step: 1.2 创建routerHistory对象
	const routerHistory: RouterHistory = {
		location: START,
		state: {},
		base,
		createHref: createHref.bind(null, base),

		// Step: 1.2.2 replace函数
		replace(to) {
			// Tips: 先移除当前，再设置新的历史记录
			queue.splice(position--, 1);
			setLocation(to);
		},

		// Step: 1.2.3 push函数
		push(to, data?: HistoryState) {
			// Tips: 直接设置新的历史记录
			setLocation(to);
		},

		listen(callback) {
			listeners.push(callback);
			return () => {
				const index = listeners.indexOf(callback);
				if (index > -1) listeners.splice(index, 1);
			};
		},
		destroy() {
			listeners = [];
			queue = [START];
			position = 0;
		},

		go(delta, shouldTrigger = true) {
			const from = this.location;
			const direction: NavigationDirection = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
			position = Math.max(0, Math.min(position + delta, queue.length - 1));
			if (shouldTrigger) {
				triggerListeners(this.location, from, {
					direction,
					delta,
				});
			}
		},
	};

	Object.defineProperty(routerHistory, 'location', {
		enumerable: true,
		get: () => queue[position],
	});

	// Step: 1.3 返回routerHistory对象
	return routerHistory;
}
```

#### 几个核心函数

#### createRouter

`createRouter` 函数用于根据我们传入的配置创建一个可以被 `Vue` 应用使用的 `Router` 实例。

`Router` 对象中包含了几种方法，都很见名知意，按照用途可分成：

- 路由切换：push、replace、go、back、forward
- 操作路由：addRoute、removeRoute、hasRoute、getRoutes、resolve
- 添加路由守卫：beforeEach、beforeResolve、afterEach
- 挂载router： install
- 其他：onError

`createRouter` 的源码实在太长了，以下的代码做过删减。

```typescript
// Step: 1. 创建router对象
export function createRouter(options: RouterOptions): Router {
	// Step: 1.1 创建匹配器
	const matcher = createRouterMatcher(options.routes, options);

	// Tips: 解析查询的自定义实现、对查询对象进行字符串化的自定义实现
	const parseQuery = options.parseQuery || originalParseQuery;
	const stringifyQuery = options.stringifyQuery || originalStringifyQuery;
	const routerHistory = options.history;

	// Tips: 存放全局路由守卫
	const beforeGuards = useCallbacks<NavigationGuardWithThis<undefined>>();
	const beforeResolveGuards = useCallbacks<NavigationGuardWithThis<undefined>>();
	const afterGuards = useCallbacks<NavigationHookAfter>();

	// Step: 1.2 创建指向当前路由的响应式对象
	// Tips: 会在挂载router的时候提供给后代组件使用
	// Tips: 在RouterView组件中通过观察currentRoute的变化渲染不同的组件
	const currentRoute = shallowRef<RouteLocationNormalizedLoaded>(START_LOCATION_NORMALIZED);

	// Tips: 无论是push还是replace，最终都执行的pushWithRedirect函数
	function push(to: RouteLocationRaw) {
		return pushWithRedirect(to);
	}
	function replace(to: RouteLocationRaw) {
		return push(assign(locationAsObject(to), { replace: true }));
	}

	// Step: 1.3 创建router对象
	const router: Router = {
		currentRoute,
		listening: true,

		addRoute,
		removeRoute,
		hasRoute,
		getRoutes,
		resolve,
		options,

		push,
		replace,
		go,
		back: () => go(-1),
		forward: () => go(1),

		beforeEach: beforeGuards.add,
		beforeResolve: beforeResolveGuards.add,
		afterEach: afterGuards.add,

		onError: errorListeners.add,
		isReady,

		// Step: 2 作为Vue的插件
		install(app: App) {
			const router = this;
			// Step: 2.1 注册路由组件
			app.component('RouterLink', RouterLink);
			app.component('RouterView', RouterView);

			// Tips: 挂载在全局对象上，可通过getCurrentInstance().$router获取&使用
			app.config.globalProperties.$router = router;
			// Tips: 代理currentRoute，解除响应式，使其无法被修改
			Object.defineProperty(app.config.globalProperties, '$route', {
				enumerable: true,
				get: () => unref(currentRoute),
			});

			// Step: 2.2 进行首次初始化导航
			if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
				started = true;
				push(routerHistory.location).catch((err) => {
					if (__DEV__) warn('Unexpected error when starting the router:', err);
				});
			}

			const reactiveRoute = {} as RouteLocationNormalizedLoaded;
			for (const key in START_LOCATION_NORMALIZED) {
				Object.defineProperty(reactiveRoute, key, {
					get: () => currentRoute.value[key as keyof RouteLocationNormalized],
					enumerable: true,
				});
			}

			// Step: 2.3 提供给后代使用的属性
			app.provide(routerKey, router);
			app.provide(routeLocationKey, shallowReactive(reactiveRoute));
			app.provide(routerViewLocationKey, currentRoute);

			// Step: 2.4 劫持app.unmount方法，在卸载前执行清理逻辑
			const unmountApp = app.unmount;
			installedApps.add(app);
			app.unmount = function () {
				installedApps.delete(app);
				if (installedApps.size < 1) {
					pendingLocation = START_LOCATION_NORMALIZED;
					removeHistoryListener && removeHistoryListener();
					removeHistoryListener = null;
					currentRoute.value = START_LOCATION_NORMALIZED;
					started = false;
					ready = false;
				}
				unmountApp();
			};
		},
	};

	// Step: 1.4 返回router对象
	return router;
}
```

#### pushWithRedirect

`pushWithRedirect`是 `createRouter` 内部定义的一个函数。它主要做这几件事：

1. 处理路由信息，如：是否重定向
2. 执行navigate函数，进行导航
3. 执行finalizeNavigation函数，更新currentRoute
4. 执行triggerAfterEach函数，触发afterEach守卫

```typescript
// Step: 3 进行路由导航或重定向
function pushWithRedirect(
	to: RouteLocationRaw | RouteLocation,
	redirectedFrom?: RouteLocation
): Promise<NavigationFailure | void | undefined> {
	// Step: 3.1 获取目标路由
	const targetLocation: RouteLocation = (pendingLocation = resolve(to));
	const from = currentRoute.value;
	const data: HistoryState | undefined = (to as RouteLocationOptions).state;
	const force: boolean | undefined = (to as RouteLocationOptions).force;
	// to could be a string where `replace` is a function
	const replace = (to as RouteLocationOptions).replace === true;

	// Step: 3.2 是否需要重定向
	const shouldRedirect = handleRedirectRecord(targetLocation);
	if (shouldRedirect)
		return pushWithRedirect(
			assign(locationAsObject(shouldRedirect), {
				state: typeof shouldRedirect === 'object' ? assign({}, data, shouldRedirect.state) : data,
				force,
				replace,
			}),
			// keep original redirectedFrom if it exists
			redirectedFrom || targetLocation
		);

	// if it was a redirect we already called `pushWithRedirect` above
	const toLocation = targetLocation as RouteLocationNormalized;
	toLocation.redirectedFrom = redirectedFrom;

	// Step: 3.3 执行navigate函数
	// Tips: 找到离开的记录、更新的记录、进入的记录，执行对应的路由守卫
	return navigate(toLocation, from)
		.catch((error: NavigationFailure | NavigationRedirectError) =>
			//
			isNavigationFailure(error)
				? // navigation redirects still mark the router as ready
				  isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)
					? error
					: markAsReady(error) // also returns the error
				: // reject any unknown error
				  // Tips: 对于未知的错误，执行onError注册的回调
				  triggerError(error, toLocation, from)
		)
		.then((failure: NavigationFailure | NavigationRedirectError | void) => {
			// Step: 3.4 执行finalizeNavigation函数，更新currentRoute
			failure = finalizeNavigation(toLocation as RouteLocationNormalizedLoaded, from, true, replace, data);

			// Step: 3.5 触发全局守卫afterEach
			triggerAfterEach(toLocation as RouteLocationNormalizedLoaded, from, failure);
			return failure;
		});
}
```

#### navigate

`navigate` 是 `createRouter` 内部定义的一个函数。它以 **promise链** 的形式收集不同阶段的路由守卫，并执行。执行的守卫顺序依次如下：

- beforeRouteLeave
- leaveGuards（Composition）
- beforeEach
- beforeRouteUpdate
- updateGuards（Composition）
- beforeEnter
- beforeRouteEnter
- beforeResolve

`navigate` 执行完成后，会执行 `triggerAfterEach` 函数触发 `afterEach` 守卫

```typescript
// Step: 4. 导航的方法
function navigate(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded): Promise<any> {
	let guards: Lazy<any>[];

	// Step: 4.1 收集离开的记录、更新的记录、进入的记录
	const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);

	// Step: 4.2 收集组件内守卫beforeRouteLeave
	guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);

	// Step: 4.3 收集Composition守卫leaveGuards
	for (const record of leavingRecords) {
		record.leaveGuards.forEach((guard) => {
			guards.push(guardToPromiseFn(guard, to, from));
		});
	}

	const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);

	guards.push(canceledNavigationCheck);

	return (
		// Step: 4.4 执行组件内守卫beforeRouteLeave、Composition守卫leaveGuards
		runGuardQueue(guards)
			.then(() => {
				// Step: 4.5 收集全局守卫beforeEach，并执行
			})
			.then(() => {
				// Step: 4.6 收集组件内守卫beforeRouteUpdate、Composition守卫updateGuards， 并执行
				return runGuardQueue(guards);
			})
			.then(() => {
				// Step: 4.7 收集路由独享守卫beforeEnter， 并执行
				return runGuardQueue(guards);
			})
			.then(() => {
				// Step: 4.8 收集组件内守卫beforeRouteEnter， 并执行
				return runGuardQueue(guards);
			})
			.then(() => {
				// Step: 4.9 收集全局守卫beforeResolve， 并执行
				return runGuardQueue(guards);
			})
	);
}
```

## 路由组件

### RouterView

`RouterView` 组件用于显示与url对应的组件，在其内部做了这几件事情：

1. 注入 routerViewLocationKey（当前路由信息）
2. 注入 viewDepthKey（当前RouterView组件的层级）
3. 根据层级从当前路由信息中获取匹配的路由
4. 根据匹配的路由获取需要渲染的组件
5. 执行渲染函数h，创建对应的 vnode

```typescript
// Step: 1. 定义RouterView组件
export const RouterViewImpl = /*#__PURE__*/ defineComponent({
	name: 'RouterView',
	inheritAttrs: false,
	props: {
		name: {
			type: String as PropType<string>,
			default: 'default',
		},
		route: Object as PropType<RouteLocationNormalizedLoaded>,
	},
	compatConfig: { MODE: 3 },

	setup(props, { attrs, slots }) {
		// Step: 1.1 注入routerViewLocationKey（当前路由信息），获取即将显示的路由信息
		const injectedRoute = inject(routerViewLocationKey)!;
		const routeToDisplay = computed<RouteLocationNormalizedLoaded>(() => props.route || injectedRoute.value);

		// Step: 1.2 注入viewDepthKey（当前RouterView组件的层级）
		const injectedDepth = inject(viewDepthKey, 0);
		const depth = computed<number>(() => {
			let initialDepth = unref(injectedDepth);
			const { matched } = routeToDisplay.value;
			let matchedRoute: RouteLocationMatched | undefined;
			while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
				initialDepth++;
			}
			return initialDepth;
		});

		// Step: 1.3 根据层级从当前路由信息中获取匹配的路由
		const matchedRouteRef = computed<RouteLocationMatched | undefined>(() => routeToDisplay.value.matched[depth.value]);

		// Step: 1.4 提供给后代组件（尤其是子RouterView组件）
		provide(
			viewDepthKey,
			computed(() => depth.value + 1)
		);
		provide(matchedRouteKey, matchedRouteRef);
		provide(routerViewLocationKey, routeToDisplay);

		const viewRef = ref<ComponentPublicInstance>();

		// Step: 1.5 观察匹配的路由
		watch(
			() => [viewRef.value, matchedRouteRef.value, props.name] as const,
			([instance, to, name], [oldInstance, from, oldName]) => {
				if (to) {
					to.instances[name] = instance;
					if (from && from !== to && instance && instance === oldInstance) {
						if (!to.leaveGuards.size) {
							to.leaveGuards = from.leaveGuards;
						}
						if (!to.updateGuards.size) {
							to.updateGuards = from.updateGuards;
						}
					}
				}

				// Tips: 触发beforeRouterEnter守卫
				if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
					(to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
				}
			},
			{ flush: 'post' }
		);

		return () => {
			const route = routeToDisplay.value;
			const currentName = props.name;
			const matchedRoute = matchedRouteRef.value;

			// Step: 1.6 获取需要渲染的组件
			const ViewComponent = matchedRoute && matchedRoute.components![currentName];

			if (!ViewComponent) {
				return normalizeSlot(slots.default, { Component: ViewComponent, route });
			}

			const routePropsOption = matchedRoute.props[currentName];
			const routeProps = routePropsOption
				? routePropsOption === true
					? route.params
					: typeof routePropsOption === 'function'
					  ? routePropsOption(route)
					  : routePropsOption
				: null;

			const onVnodeUnmounted: VNodeProps['onVnodeUnmounted'] = (vnode) => {
				if (vnode.component!.isUnmounted) {
					matchedRoute.instances[currentName] = null;
				}
			};

			// Step: 1.7 执行渲染函数生成vnode
			const component = h(
				ViewComponent,
				assign({}, routeProps, attrs, {
					onVnodeUnmounted,
					ref: viewRef,
				})
			);

			// Step: 1.8 返回
			return normalizeSlot(slots.default, { Component: component, route }) || component;
		};
	},
});
```
