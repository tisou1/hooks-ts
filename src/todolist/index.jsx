import { useState, useRef, useEffect,useMemo } from 'react'
import './index.css'
const initialTodos = ['java','js','react']
let colorNum = 0
export default function TodoList(){
  const [bgColor, setColor] = useState('#000')
  const [todos, setTodos] = useState(initialTodos)
  const handleChange = todo => setTodos(todos => [...todos, todo])
  useEffect(()=>{
    console.log(bgColor) 
    
  })
 
  const handleColorChange = e => {
    const currentColor = e.target.value
    // console.log(e.target.value)
    setColor(currentColor)
  }
  return (
    <div className='todolist' style={{backgroundColor:`${bgColor}`}}>
      <main className='clors'>
        <input type="color"  onChange={handleColorChange}/>
        <span className='colorNum'>因颜色渲染次数:{colorNum}</span>
      </main>
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
  const numRef = useRef(0)
  //如果在这里直接写numRef.current += 1  ,每次会莫名的加2
  // numRef.current += 1
  useEffect(()=>{
    numRef.current += 1
    colorNum++
  })
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
  const handleClick = (e) => {
    const {value} = ref.current
    setTodos(value)
    ref.current.value = ''
  }
  return (
    <div>
      <input type="text" ref={ref}/>
      <button onClick={handleClick}>添加</button>
    </div>
  )
}