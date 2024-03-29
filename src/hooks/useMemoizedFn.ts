import { useMemo, useRef } from 'react'

type noop = (...args: any[]) => any

export default function useMemoizedFn<T extends noop>(fn: T){
  if(process.env.NODE_ENV === 'development') {
    if(typeof fn !== 'function'){
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useRef<T>(fn)

  fnRef.current = useMemo(() => fn, [fn])

  const memoizedFn = useRef<T>();
  if(!memoizedFn.current){
    //在render阶段更新memoizedFn的引用
    memoizedFn.current = function (...args){
      return fnRef.current.apply(args)
    } as T
  }


  return memoizedFn.current
}