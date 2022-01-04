import { useEffect, useState } from "react";
import useDebounceFn from "./useDebounceFun";
import type { DebounceOptions } from './useDebounceFun'
//防抖函数 

function useDebounce<T>(value: T, options?: DebounceOptions){
  const [debounced, setDebounced] = useState(value)

  //进行函数的防抖,控制时间
  const { run } = useDebounceFn(()=>{
    setDebounced(value)
  },options)

  //上面的函数执行后,这里状态得到更新,effect函数得以执行
  useEffect(()=>{
    run();
  },[value])

  return debounced
}

export default useDebounce