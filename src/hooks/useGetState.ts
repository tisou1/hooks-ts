import { useState, useRef, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import useLatest from './useLatest'


type GetStateAction<S> = () => S

/**
 * 给useState添加一个getState方法,返回最新的state
 * @param initialState 
 */
function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>]

function useGetState<S = undefined>():[
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];


function useGetState<S>(initialState?: S) {
  const [state, setState] = useState()
  const stateRef = useLatest(state)


  const getState = useCallback(() => stateRef.current,[])

  return [
    state,
    setState,
    getState
  ]
}