import { useRef } from 'react' 
import type { useEffect, useLayoutEffect} from 'react'

type effectHookType = typeof useEffect | typeof useLayoutEffect

const createUpdateEffect: (hook: effectHookType) => effectHookType = 
  (hook) => (effect, deps) => {
    const isMounted = useRef(false)

    //for react-refresh
    hook(() => {
      //卸载时,设为false
      return () => {
        isMounted.current = false
      }
    },[])

    hook(() => {
      if(!isMounted.current){
        isMounted.current = true
      } else {
        return effect()
      }
    },deps)
}


export default createUpdateEffect