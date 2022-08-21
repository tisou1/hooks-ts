import { useRef } from "react";
import { useUpdate, useCreation } from './index'


const observer = <T extends Record<string, unknown>>(initialized: T, cb: () => void): T => {

  const proxy = new Proxy<T>(initialized, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key)
    },

    set(target, key, val) {
      const ret = Reflect.set(target, key, val)
      cb()
      return ret
    }
  })

  return proxy
}


export default function useReactive<T extends Record<string, unknown>>(initialState: T): T {
  const ref = useRef<T>(initialState)
  const update = useUpdate()

  const state = useCreation(() => observer(ref.current, () => { update() }), [])

  return state!
}
