import React,{useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {useCountDown, useLatest, useTimeout} from './hooks'
import TodoList from './todolist'
function App() {

  const [count, setCount] = useState(0)
  const latestCount = useLatest(count)
  //倒计时的毫秒数,格式化后的倒计时
  // const [countdowm, formattedRes] = useCountDown({
  //   targetDate:'2021-12-30 11:15:00',
  //   interval:1000,//默认就是1000
  //   onEnd:()=>{
  //     alert('倒计时结束')
  //   }
  // })
  function handleAlertClick() {
    // useTimeout(()=> alert(`Latest count value: ${latestCount.current} ${count}`),1000)
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current} ${count}`);
    }, 3000);
  }
  // console.log(formattedRes)
  // const { days, hours, minutes, seconds, milliseconds } = formattedRes;
  return (
    <div className="App">
      {/* {count}
      <button onClick={()=>setCount(count + 1)}>加一</button>
      <button onClick={handleAlertClick}>显示当前的count</button> */}
      {/* {countdowm} */}
         {/* There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds}{' '}
        milliseconds until 2022-12-31 24:00:00 */}

          <TodoList/>
    </div>
  );
}

export default App;
