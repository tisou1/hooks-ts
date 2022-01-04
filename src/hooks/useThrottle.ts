import { useEffect, useState } from "react";
import useThrottleFn from "./useThrottleFn";
import type { ThrottleOptions } from "./useThrottleFn";
// export interface ThrottleOptions {
//   wait?: number;
//   leading?: boolean;
//   trailing?: boolean;
// }
/**
 * 
 * @param values 
 * @param options 
 * @returns 
 * 频繁调用, 但只会每隔设定的时间执行一次相关函数
 */
function useThrottle<T>(values: T, options?: ThrottleOptions){
  const [throttled, setThrottled] = useState(values)

  const { run } = useThrottleFn(() => {
    setThrottled(values)
  },options)


  useEffect(()=>{
    run()
  },[values])

  return throttled  
}

export default useThrottle