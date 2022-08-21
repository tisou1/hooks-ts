import depsAreSame from '../utils/depsAreSame'
import { useLatest, useUnmount } from './index'
import { useRef, useEffect, DependencyList } from 'react'

const useEffectTarget = (effect: () => void, deps: DependencyList, target: any) => {

  const hasInitRef = useRef(false)//是否初始化
  const elenmentRef = useRef<(Element | null)[]>([])//dom元素
  const depsRef = useRef<DependencyList>([])  //依赖项
  const unMountRef = useRef<any>() //存储effect()的返回值，用于销毁effect()

  useEffect(() => {

    // const targets = Array.isArray(target) ? target : [ target ]
    // const els = targets.map(item => 'current' in item ? item.current : window)
    const targetElement = 'current' in target ? target.current : window

    if(!hasInitRef.current) {
      hasInitRef.current = true

      elenmentRef.current = targetElement
      depsRef.current = deps
      unMountRef.current = effect()
      return
    }

    if(elenmentRef.current !== targetElement || !depsAreSame(deps, depsRef.current)) {
      unMountRef.current()

      elenmentRef.current = targetElement
      depsRef.current = deps
      unMountRef.current = effect()
    }
  })


  useUnmount(() => {
    unMountRef.current()
    hasInitRef.current = false
  })
  
}


const useEventListener = (event: string, handler: (e: Event) => void, target: any = window) => {
  const handlerRef = useLatest(handler)

  useEffectTarget(() => {
    //这里表明target 是一个ref作用在dom上的
    const targetElement = 'current' in target ? target.current : window

    if(!targetElement.addEventListener) return

    
    const eventListener = (event: Event) => {
      return handlerRef.current(event);
    };


    targetElement.addEventListener(event, eventListener)

    return () => {
      targetElement.removeEventListener(event, eventListener)
    }
  }, [event], target)
}

export default useEventListener