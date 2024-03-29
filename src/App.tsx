import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  useReactive,
  useLatest,
  usePrevious,
  useHover,
  useEventListener,
  useBattery,
  useKey
} from './hooks'

function App() {

  const state = useReactive<any>({
    count: 0,
    name: '小杜杜',
    flag: true,
    arr: [],
    bugs: ['小杜杜', 'react', 'hook'],
    addBug(bug: string) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  })

  const [count, setCount] = useState(0)
  const l = useLatest(count)
  const p = usePrevious(count)

  const r1 = useRef<any>(null)
  const r2 = useRef<any>(null)

  useEventListener('click', () => {
    console.log('r1点击')
  }, {
    target: r1
  })

  useHover(r2, {
    onEnter: () => {
      console.log('onEnter');
    },
    onLeave: () => {
      console.log('onLeave');
    },
    onChange: isHover => {
      console.log('onChange', isHover);
    },
  })

  const batteryState = useBattery()

  useKey('a', () => {
    console.log('按下了按键a')
  })
  
  return (
    <div>
      <p ref={r1}>count:{count}</p>
      <p ref={r2}>count:{l.current}</p>
      <p>usePrevious count:{p}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <pre>
        {
          JSON.stringify(batteryState, null, 2)
        }
      </pre>
    </div>
  );
}

export default App;
