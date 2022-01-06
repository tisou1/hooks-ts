import { useRef, useCallback } from "react";

/**
 * 给异步任务加一个竟态锁,防止并发执行
 * @param fn 
 * @returns 
 */
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
){

  const lockRef = useRef(false)


  return useCallback(() => {
    async (...args: P) => {
      if(lockRef.current) return
      lockRef.current = true

      try{
        const ret = await fn(...args)
        lockRef.current = false
        return ret
      } catch (e) {
        lockRef.current = false
        throw e
      }
    }
  },[fn])
}

export default useLockFn