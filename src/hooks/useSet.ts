import { useState } from 'react'
import useMemoizedFn from './useMemoizedFn'

/**
 * 管理 Set类型状态的hook
 * @param initialValue 
 * @returns 
 */
function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue)
  }

  const [set, setSet] = useState<Set<K>>(() => getInitValue())

  const add = (key: K) => {
    if(set.has(key)){
      return
    }

    setSet((prevSet) => {
      const temp = new Set(prevSet)
      temp.add(key)
      return temp
    })
  }

  const remove = (key: K) => {
    if(!set.has(key)){
      return
    }

    setSet((prevSet) => {
      const temp = new Set(prevSet)
      temp.delete(key)
      return temp
    })
  }

  const reset = () => setSet(getInitValue())


  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    }
  ] as const
}

export default useSet