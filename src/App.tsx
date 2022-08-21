import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useCountDown, useLatest, useTimeout} from './hooks'

function App() {

  const [count, setCount] = useState(0)
  const latestCount = useLatest(count)

  return (
    <div className="App">
      app
    </div>
  );
}

export default App;
