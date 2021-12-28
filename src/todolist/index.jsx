import { useState, useRef, useEffect } from 'react'
import './index.css'
const initialTodos = ['java','js','react']
export default function TodoList(){
  const [todos, setTodos] = useState(initialTodos)
  const handleChange = todo => setTodos(todos => [...todos, todo])

  return (
    <div className='todolist'>
      <ul>
        {
          todos.map((todo,idx) => (
            <li key={idx}>
             <Todo  todo={todo}/>
            </li>
          ))
        }
      </ul>
      <AddTodo setTodos={handleChange}/>
    </div>
  )
}

// interface TodoType {
//   key:number
//   todo: string
//   onChange:() => void
// }

function Todo(props){
  const { todo } = props
  const [active, setActive] = useState(false)
  const numRef = useRef(12)
  //如果在这里直接写numRef.current += 1  ,每次会莫名的加2
  numRef.current += 2
  // useEffect(()=>{
  //   numRef.current += 1
  // })
  console.log('/////////',numRef.current)
  return(
    <>
      <span className={`status ${active ? 'active' : ''}`} onClick={()=>setActive(!active)}></span>
      <span className='li'>{todo}</span>
      <span className='num'>{numRef.current}</span>
    </>

  )
}

// type AddType = {
//   setTodos:() => void
// }

function AddTodo(props){
  const { setTodos } = props
  const ref = useRef()
  const handleClick = () => {
   const {value} = ref.current
  //  console.log(value)
   setTodos(value)
  }
  return (
    <div>
      <input type="text" ref={ref}/>
      <button onClick={handleClick}>添加</button>
    </div>
  )
}