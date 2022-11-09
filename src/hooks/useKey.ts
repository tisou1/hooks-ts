import useEventListener from "./useEventListener"
import { DependencyList, useMemo } from 'react'

type noop = (...args: any) => any


export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);
export type Handler = (event: KeyboardEvent) => void;

export interface UseKeyOptions<T extends any> {
  event?: 'keydown' | 'keypress' | 'keyup';
  target?: T | null;
  options?: any;
}


const createKeypredicate = (keyFilter: KeyFilter):KeyPredicate => 
  typeof keyFilter === 'function'
    ? keyFilter
    : typeof keyFilter === 'string'
      ? (event: KeyboardEvent) => event.key === keyFilter
      : keyFilter
      ? () => true
      : () => false


function useKey<T extends any>(
  key: KeyFilter,
  fn: Handler = () => {},
  opts: UseKeyOptions<T> = {},
  deps: DependencyList = [key]
) {
  const { event = 'keydown', target, options} = opts
  const useMemoHandler = useMemo(() => {
    const predicate: KeyPredicate = createKeypredicate(key)
    const handler: Handler =  (handlerEvent) => {
      if(predicate(handlerEvent)) {
        return fn(handlerEvent)
      }
    }

    return handler
  },deps)

  useEventListener(event ,useMemoHandler, {
    ...options,
    target,
  })
}


export default useKey