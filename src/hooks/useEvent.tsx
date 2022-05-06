import { useLayoutEffect, useCallback, useRef} from 'react'


type Event<T> = (...args: T[]) => void

/**
 * 与useMemoizedFn是在render阶段进行更新handler,渲染还未开始,可能会发生中断(在react18中的current mode中,可能会多次执行)
 * useEvent的话是在`useLayoutEffect`中更新,也就是渲染完成后
 * @param handler 
 * @returns 
 */

export default function useEvent<T>(handler: Event<T>): Event<T> {
  const handlerRef = useRef<Event<T> | null>(null)

  //在渲染完成后同步更新`handlerRef.current`,这时候在handler内部就能拿到最新的state和props
  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  //使用useCallback缓存handler
  return useCallback((...args: T[]) => {
    const handler = handlerRef.current!

    return handler(...args)
  },[])

}
