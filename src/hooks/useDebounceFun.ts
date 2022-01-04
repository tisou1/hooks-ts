import debounce from 'lodash/debounce';
import { useMemo } from 'react'
import useLatest from './useLatest'
import useUnmount from './useUnmount'


type noop = (...args: any) => any

export interface DebounceOptions{
  wait?: number,
  leading?: boolean,
  trailing?: boolean,
  maxWait?: number,
}

/**
 * 
 * @param fn 
 * @param options 
 * @returns 
 * 频繁调用,但只会在所有的事件(点击,输入...)完成后执行一次相关的函数
 */
function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions){
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const debounced = useMemo(()=>{

    return debounce<T>(
      ((...args: any[]) =>{
        return fnRef.current(...args)
      }) as T,
      wait,
      options,
    )
  },[])

  useUnmount(()=>{
    debounced.cancel()
  })


  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export default useDebounceFn