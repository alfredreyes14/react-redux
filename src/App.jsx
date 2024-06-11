import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { addTask, listAllTask } from './store/todo/reducer'

function App() {
  const tasks = useSelector(state => state.tasks)
  const { tasks: taskItems, loading } = tasks
  const dispatch = useDispatch()

  const handleAddTask = () => {
    const rand = Math.floor(Math.random() * 10000)
    dispatch(addTask({ task: `Task ${rand}`}))
  }

  useEffect(() => {
    dispatch(listAllTask())
  }, [])

  return (
    <>
      <p>Hello World</p>
      <button onClick={() => handleAddTask()}>Add Task</button>
      {taskItems.map(task => <p style={{ color: 'white' }}>{ task.task }</p>)}
    </>
  )
}

export default App
