import { useState, useEffect } from "react"
import { TodoProvider }  from "./contextApi/index.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx"

function App() {
  const [todos, setTodos] = useState([]);

  const addtodo = (todo) => {
    setTodos((prevtodos) => [{id: Date.now(), ...todo}, ...prevtodos])
  }
  const updatedtodo = (todo, id) => {
    setTodos((prev)=> prev.map(prevtodo=>(prevtodo.id === id ? todo : prevtodo )))
  }

  const completedtodo = (id) => {
    setTodos((prev)=> prev.map(prevtodo=>(prevtodo.id === id)? {...prevtodo, completed: !prevtodo.completed}: prevtodo))
  }

  const deletedtodo = (id) => {
    setTodos((prev)=> prev.filter(prevtodo=>(prevtodo.id != id)))
  }

const copytodo = (todo) => {
  console.log(todo)
  navigator.clipboard.writeText(todo)
  alert("Todo copied to clipboard")
  
}

  useEffect(() => {
   localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])
  

  return (
    <TodoProvider value={{todos, updatedtodo, completedtodo, deletedtodo, addtodo, copytodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                          <div key={todo.id} className="w-full">
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
