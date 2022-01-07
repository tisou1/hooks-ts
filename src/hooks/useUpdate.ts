import { useCallback, useState } from "react";

/**
 * 返回一个函数,调用该函数会强制组件重新渲染
 * @returns { function }
 */
const useUpdate = () => {
  const [, setState] = useState({})

  return useCallback( () => setState({}),[]) 
}

export default useUpdate