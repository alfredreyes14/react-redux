import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

let id = 0
const initialState = {
  tasks: [],
  loading: false,
  error: null
}

export const fetchTasks = createAsyncThunk("fetchTasks", async (a, { rejectWithValue }) => {
  try {
    const res = await axios.get('http://localhost:5000/api/tasks')
    return { tasks: res.data }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})

export const updateTask = createAsyncThunk("updateTasks", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.patch(`http://localhost:5000/api/tasks/${id}`, {
      completed: false
    })
    return { tasks: res.data }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})

export const listAllTask = createAsyncThunk('listAllTask', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/tasks`)

    return { tasks: res.data }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { payload } = action
      state.tasks.push({
        id: ++id,
        task: payload.task,
        completed: false
      })
    },
    removeTask: (state, action) => {
      const { payload } = action
      const index = state.tasks.findIndex(task => task.id === payload.id)
      state.tasks.splice(index, 1)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { payload } = action
        state.tasks.push(...payload.tasks)
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        const { payload } = action
        state.error = payload.error
        state.loading = false
      })
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { payload } = action
        const { id, ...rest } = payload
        const index = state.tasks.findIndex(task => task.id === id)
        const task = state.tasks[index]
        state.tasks[index] = { ...task, ...rest }
      })
      .addCase(listAllTask.fulfilled, (state, action) => {
        const { payload } = action
        const { tasks } = payload
        state.tasks.push(...tasks)
      })
  }
})

// const reducer = createReducer([], builder => {
//   builder
//     .addCase('ADD_TASK', (state, action) => {
//       const { payload } = action
//       state.push({
//         id: ++id,
//         task: payload.task,
//         completed: false
//       })
//     })
//     .addCase('REMOVE_TASK', (state, action) => {
//       const { payload } = action
//       const index = state.findIndex(task => task.id === payload.id)
//       state.splice(index, 1)
//     })
//     .addDefaultCase((state, action) => [])
// })

/** OLD CODE */
// const reducer = (state = [], action) => {
//   const { type, payload } = action

//   switch (type) {
//     case "ADD_TASK":
//         return [
//           ...state,
//           {
//             id: ++id,
//             task: payload.task,
//             completed: false
//           }
//         ]
//     case "REMOVE_TASK":
//         return state.filter(task => task.id !== payload.id)
//     default:
//         return state
//   }
// }
/** END */
const { addTask, removeTask } = taskSlice.actions

export { addTask, removeTask }
export default taskSlice.reducer