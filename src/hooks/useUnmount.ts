import { useEffect } from "react";
import  useLatest  from "./useLatest";

function useUnmount(fn: () => void){
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn)

  useEffect(()=>{
    return () => {
      fnRef.current()
    }
  },[])
  
}

export default useUnmount