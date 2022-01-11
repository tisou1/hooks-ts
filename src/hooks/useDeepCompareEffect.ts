import { isEqual } from "lodash";
import { useEffect, useRef } from "react";
import type { DependencyList, EffectCallback } from "react";

function depsEqual(aDeps: DependencyList, bDeps: DependencyList = []){
  //使用lodash的isEqual进行深度比较
  return isEqual(aDeps, bDeps)
}

/**
 * 深度比较useEffect的依赖项,用法和useEffect一致
 * @param effect 
 * @param deps 
 */
function useDeepCompareEffect(effect:  EffectCallback, deps: DependencyList) {
  const ref = useRef<DependencyList>()
  const signalRef = useRef<number>(0)

  if(!depsEqual(deps, ref.current)){
    ref.current = deps
    signalRef.current += 1
  }

  useEffect(effect,[signalRef.current])
}


export default useDeepCompareEffect