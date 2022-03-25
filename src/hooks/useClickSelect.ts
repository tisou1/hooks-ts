import React, {useState, useCallback, useEffect, useRef } from "react"
//React.MutableRefObject<ReactElement>
function useClickSelect(inlineRef: any) {
  //在第一次渲染的时候,会拿不到inlineRef的值.
  //因为在调用这个useClick这个hooks的时候.inLineRef还没初始化
  //组件挂载的时候,才会给current属性传入dom值
  console.log(inlineRef)
  const [show, setShow] = useState(false)
  useEffect(() => {
    document.addEventListener('mouseup', handleClick)
    return () => document.removeEventListener('mouseup', handleClick)
  },[])

  const handleClick = (e: any) => {
    if(!inlineRef.current.contains(e.target)) {
      setShow(false)
    } 
  }
  //需要手动传入一个ref,来表示下拉的数据源,e表示触发事件的事件源
  const clickFn =  useCallback((e) => {
    // console.log('是否是子元素或者本身',inlineRef.current.contains(e.target))
    if(!inlineRef.current.contains(e.target)) {
      setShow(false)
    } else {
      setShow(true)
    }
  },[])



  return {
    show,
    clickFn
  }
}


export default useClickSelect
 

/**
 * useClick返回一个函数,接受一个ref参数
 * 在用的视时候,直接吧返回的函数作用在dom的onClick事件上.
 */
