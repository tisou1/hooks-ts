import { useRef } from 'react'
/**
 * 
 * @param value 
 * @returns 
 * 返回当前最新的 Hook, 可以避免闭包
 */
export function useLatest<T>(value: T){
  const ref = useRef(value)
  ref.current = value

  //使用useEffect更新ref,也可以
  return ref
}

