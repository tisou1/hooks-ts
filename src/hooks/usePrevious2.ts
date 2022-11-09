import { useEffect, useRef } from "react"


function usePrevious2<T>(value: T): T | undefined {

  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

export default usePrevious2