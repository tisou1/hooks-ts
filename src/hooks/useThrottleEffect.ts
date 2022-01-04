import { useEffect, useState } from "react";
import type { DependencyList, EffectCallback } from "react";
import type { ThrottleOptions } from "./useThrottleFn";
import useThrottleFn from "./useThrottleFn";
import useUnmount from './useUnmount'
import useUpdateEffect from './useUpdateEffect'



function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  //仅仅作为一个标识,其实也可以设置时间戳
  const [flag, setFlag] = useState({})

  const { run, cancel } = useThrottleFn(() => {
    setFlag({})
  },options)

  useEffect(() => {
    return run()
  },deps)

  useUnmount(cancel)

  useUpdateEffect(effect, [flag])
}

export default useThrottleEffect