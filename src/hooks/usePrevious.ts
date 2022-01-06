import { useRef } from "react";

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean
//浅比较
const defaultShouldUpdate = <T>(a?: T, b?: T) => a !== b

/**
 * 保存上一次状态的 hook
 * @param state 代表保存的状态
 * @param shouldUpdate 
 * @returns 
 */
function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate
): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  if(shouldUpdate(curRef.current, state)){
    prevRef.current = curRef.current
    curRef.current = state
  }

  return prevRef.current
}

export default usePrevious