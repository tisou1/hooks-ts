import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useReactive, useLatest, usePrevious } from './hooks'

function App() {

  const state = useReactive<any>({
    count: 0,
    name: '小杜杜',
    flag: true,
    arr: [],
    bugs: ['小杜杜', 'react', 'hook'],
    addBug(bug:string) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  })

  const  [count, setCount] = useState(0)
  const l = useLatest(count)
  const p = usePrevious(count)

  return (
    <div>
      <p>count:{count}</p>
      <p>count:{l.current}</p>
      <p>usePrevious count:{p}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

export default App;
