import { useCallback,useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useUnmount from './useUnmount'

/**
 * 只在requestAnimationFrame callback时.更新state,一般用于性能优化
 * @param initialState 
 */
function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef(0);
  const [state, setState] = useState(initialState);
  //下面的类型好像有点问题......  这是 源码中的声明.但是下面调用setState(value)时报参数类型问题
  // const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
  const setRafState = useCallback((value: S | ((prevState: SetStateAction<S | undefined>) => S)) => {
    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}


export default useRafState