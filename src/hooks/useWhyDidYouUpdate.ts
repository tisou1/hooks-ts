import { useEffect, useRef } from "react";

//IProps的属性的值变为any类型
export type IProps = Record<string, any>

function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({})

  useEffect(() => {
    if(prevProps.current){
      const allKeys = Object.keys({...prevProps.current, ...props})
      const changedProps: IProps = {}

      allKeys.forEach(key => {
        if(prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          }
        }
      })

      if(Object.keys(changedProps).length) {
        console.log('[值更新]',componentName, changedProps)
      }
    }

    prevProps.current = props
  })
}

export default useWhyDidYouUpdate