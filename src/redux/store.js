import { configureStore } from '@reduxjs/toolkit'
import webData from './reducers/webData'

export const store = configureStore({
  reducer: {
    dances: webData
  },
})