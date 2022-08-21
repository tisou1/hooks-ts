import React, { useRef } from 'react'
import type { DependencyList } from 'react'

/**
 * useCreation 是 useMemo 或 useRef 的替代品。
 * 
 * useMemo的值不一定是最新的值，但useCreation可以保证拿到的值一定是最新的值
   对于复杂常量的创建，useRef容易出现潜在的的性能隐患，但useCreation可以避免

   参数和useMemo一样，只是返回的值不一样
 */

const deepEqual = (oldDeps: DependencyList, deps: DependencyList): boolean => {
  if (oldDeps === deps) return true

  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false
  }

  return true
}

export default function useCreation<T>(
  fn: () => T,
  deps: DependencyList
) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false
  })


  if (current.initialized === false || !deepEqual(current.deps, deps)) {
    current.obj = fn()
    current.deps = deps
    current.initialized = true
  }

  return current.obj
}
