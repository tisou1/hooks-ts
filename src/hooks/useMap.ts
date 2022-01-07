import { useState } from 'react'
import useMemoizedFn from './useMemoizedFn'

/**
 * 管理map
 * @param initialValue 
 * @returns 
 */
function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue)
  }

  const [map, setMap] = useState<Map<K, V>>(() => getInitValue())

  const set = (key: K, value: V) => {
    setMap(prev => {
      const temp = new Map(prev)
      temp.set(key, value)
      return temp
    })
  }

  const setAll = (newMap:Iterable<readonly [K, V]>) => {
    setMap(new Map(newMap))
  }

  const remove = (key: K) => {
    setMap(prev => {
      const temp = new Map(prev)
      temp.delete(key)
      return temp
    })
  }

  const reset = () => setMap(getInitValue())

  const get = (key: K) => map.get(key)

  return [
    map,
    {
      set: useMemoizedFn(set),
      setAll: useMemoizedFn(setAll),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
      get: useMemoizedFn(get)
    }
  ] as const

}

export default useMap