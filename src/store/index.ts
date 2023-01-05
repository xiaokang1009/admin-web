import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import routerReducer from './routerSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    router: routerReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
