import { useRef, useEffect} from "react";
import type {DependencyList } from "react";

type Effect = (
  changes?: number[],
  previousDeps?: DependencyList,
  currentDeps?: DependencyList,
) => void | (() => void)


const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
  return deps1
    ? deps1.map((_ele, idx) => (deps1[idx] !== deps2?.[idx] ? idx : -1)).filter(ele => ele >= 0)
    : deps2
    ? deps2.map((_ele, idx) => idx)
    : []
}

/**
 * 追踪是哪个依赖项改变触发了useEffect的执行
 * @param effect 
 * @param deps 
 */
const useTrackedEffect = (effect: Effect, deps?: DependencyList) => {
  const previousDepsRef = useRef<DependencyList>()

  useEffect(() => {
    //前一次的依赖和当前的依赖作比较 返回不一样的下标
    const changes = diffTwoDeps(previousDepsRef.current, deps)
    //保存上一次的依赖项
    const previousDeps = previousDepsRef.current
    //更新上一次的依赖
    previousDepsRef.current = deps

    return effect(changes, previousDeps, deps)
  }, deps)
}

export default useTrackedEffect