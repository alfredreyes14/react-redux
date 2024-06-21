import { createEntityAdapter, createSlice, } from "@reduxjs/toolkit";

const postAdapter = createEntityAdapter()
console.log(postAdapter)
const postSlice = createSlice({
  name: 'posts',
  initialState: postAdapter.getInitialState({}, [
    {
      id: 1,
      description: 'Hello World'
    }
  ]),
  reducers: {
    postAdded: postAdapter.addOne,
    deletePost: postAdapter.removeOne,
    singleUpdate: postAdapter.updateOne
  }
})

const { postAdded, deletePost, singleUpdate } = postSlice.actions

export { postAdded, deletePost, singleUpdate }
export default postSlice.reducer