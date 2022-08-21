import React from 'react'
import useEventListener from './useEventListener'
import useBoolean from './useBoolean';
import type { BasicTarget } from '../utils/domTarget';

interface Options {
  onEnter?: () => void
  onLeave?: () => void
  onChange?: (isHovering: boolean) => void
}

export default function useHover(target: BasicTarget, options?: Options): boolean {
  const {
    onEnter,
    onLeave,
    onChange
  } = options || {}

  const [state, { setTrue, setFalse }] = useBoolean(false)

  useEventListener('mouseenter', () => {
    onEnter?.()
    setTrue()
    onChange?.(true)
  },
  {
    target
  })


  useEventListener('mouseleave', () => {
    onLeave?.()
    setFalse()
    onChange?.(false)
  }, {
    target
  })

  return state
}
