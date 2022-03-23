



## 自定义hooks
### 1.[useCountDown](./hooks/useCountDown.tsx) 
> 传入一个未来的时间.然后开启倒计时.

### 2.[useInterval](./hooks/useInterval.ts) 
> 传入回调函数和间隔时间.里面只有在卸载的时候才清除定时器.更新的话同步更新回调函数.

### 3.[useLatest](./hooks/useLatest.ts) 
>返回当前最新值的 Hook， 可以避免闭包问题。

### 4.[useUpdate](./hooks/useUpdate.ts) 
> 和class组件中的forceUpdate()差不多

### 5.[useMount](./hooks/useMount.ts) 
> 在组件初始化时执行的 Hook,在组件第一次渲染时，执行方法。

### 6.[useUnMount](./hooks/useUnmount.ts)
> 组件卸载的时候执行.

### 7.[useUnmountedRef](./hooks/useUnmountedRef.ts)
> 获取当前组件是否已经卸载的 hook

### 8.[useTimeout](./hooks/useTimeout.ts)
> 延迟执行,可以处理 setTimeout 计时器函数的 Hook。

### 9.[useSetState](./hooks/useSetState.ts)
> 合并更新state

### 10.[useGetState](./hooks/useGetState.ts)
> 给 React.useState 增加了一个 getter 方法，以获取当前最新值。

### 11.[usePrevious](./hooks/usePrevious,ts)
> 回去上一次状态的hook  两个ref进行交替 新的ref指向state 另一个ref指向新的ref

### 12.[useUpdateEffect](./hooks/useUpdateEffect.ts)
> 忽略首次执行,只在依赖更新时执行.


### 13.[useTrackedEffect](./hooks/useTrackedEffect.ts)
> 追踪是哪个依赖变化触发了 useEffect 的执行。

### 14.[useUpdateLayoutEffect](./hooks/useUpdateLayoutEffect.ts)
> 和useLayoutEffect差不多,但是会忽略首次执行,只在依赖更新时执行.

### 15.[useToggle](./hooks/useToggle.ts)
> 切换状态,不传值默认在true和false之前切换,传了值在两个值之间切换

### 16.[useBoolean](./hooks/useBoolean.ts)
> 在true和false之间进行切换.


### 17.[useWhyDidYouUpdate](./hooks/useWhyDidYouUpdate.ts)
> 追踪组件的state或者props中那个数据改变导致的重新渲染.

### 18.[useThrottleFn](./hooks/useThrottleFn.ts)
> 需要节流的函数的hook.  内部使用了lodash的节流函数作为基础

### 19.[useThrottle](./hooks/useThrottle.ts)
> 用来处理节流值的 Hook。需要节流的值,调用了上面的useThrottleFn

### 20.[useDebouceFun](./hooks/useDebounceFun.ts)
> 函数防抖的hook, 使用了lodash的防抖函数.

### 21.[useDebounce](./hooks/useDebounce.ts)
> 值防抖的hook.


- 目前已经完成`message`和`notification`组件的基本功能.包括`api`形式的调用展示,以及组件挂载和卸载时候的过渡动画,自定义时间显示,鼠标悬浮不消失等.
- 实现`popover`的不同方位显示效果和箭头的位置变化,以及出现时候的动态过渡原点设置以达到视觉上的平滑.
- 下周开始`select`组件进行一些功能上的技术调研.

