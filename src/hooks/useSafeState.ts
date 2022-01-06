import { useCallback, useState } from 'react'
import  useUnmountedRef  from "./useUnmountedRef";
import type { Dispatch, SetStateAction } from 'react';

/**
 * 
 * 使用安全的state, 组件卸载后不会进行state的更新,放置内存泄漏
 * 用法和useState一样
 * @param initialState 
 */

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmounted = useUnmountedRef()
  const [state, setState] = useState(initialState)

  const setCurrentState = useCallback((setCurrentState) => {
    if(unmounted.current) return
    setState(setCurrentState)
  },[])

  return [state, setCurrentState] as const
}


export default useSafeState



