import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counterSlice'
import { getUsers } from '../services/userApi'

export const store = configureStore({
  reducer: {
    [getUsers.reducerPath]:getUsers.reducer,
    value: counterSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(getUsers.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch