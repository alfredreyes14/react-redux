/** OLD CODE */

// import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// import reducer from "./reducer.js";

// const enhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const store = createStore(
//   reducer, 
//   enhancer
// )
/** END */
import { configureStore } from "@reduxjs/toolkit"
import reducer from "./todo/reducer.js";
import employeeReducer from "./employee/employeeReducer.js"

const store = configureStore({
  reducer: {
    tasks: reducer,
    employees: employeeReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(log)
})

export default store