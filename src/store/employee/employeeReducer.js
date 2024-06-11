import { createSlice } from "@reduxjs/toolkit";

let id = 0

const employeeSlice = createSlice({
  name: 'employee',
  initialState: [],
  reducers: {
    addEmployee: (state, action) => {
      const { payload } = action
      state.push({
        id: ++id,
        name: payload.name
      })
    },
    removeEmployee: (state, action) => {
      const { payload } = action
      const index = state.findIndex(employee => employee.id === payload.id)
      state.splice(index, 1)
    }
  }
})

const { addEmployee, removeEmployee } = employeeSlice.actions

export { addEmployee, removeEmployee }
export default employeeSlice.reducer