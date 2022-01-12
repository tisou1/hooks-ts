import type { DependencyList, EffectCallback, useEffect, useLayoutEffect } from "react";
import  { useRef } from 'react'
import { useUnmount } from "../hooks";
import useMount from "../hooks/useMount";
import depsAreSame from "./depsAreSame";
import type { BasicTarget } from "./domTarget";
import { getTargetElement } from "./domTarget";


function createEffectWithTarget(useEffectType: typeof useEffect | typeof useLayoutEffect) {

  function useEffectWithTarget(
    effect:EffectCallback,
    deps: DependencyList,
    target:  BasicTarget<any> | BasicTarget<any>[],
    //arget should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
  ) {
    const hasInitRef = useRef(false)

    const lastElementRef = useRef<(Element | null)[]>([])
    const lastDepsRef = useRef<DependencyList>([])

    const unloadRef = useRef<any>()

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target]
      const els = targets.map(item => getTargetElement(item))

      //第一次加载
      if(!hasInitRef.current){
        hasInitRef.current = true
        lastElementRef.current = els
        lastDepsRef.current = deps

        unloadRef.current = effect()
        return
      }

      if(
        els.length !== lastElementRef.current.length ||
        !depsAreSame(els, lastElementRef.current) ||
        !depsAreSame(deps, lastDepsRef.current)
      ) {
        unloadRef.current?.()

        lastElementRef.current = els
        lastDepsRef.current = deps
        unloadRef.current = effect()
      }
    })

    useUnmount(() => {
      unloadRef.current?.()
      hasInitRef.current = false
    })
  }

  return useEffectWithTarget
}

export default createEffectWithTarget