import { configureStore } from '@reduxjs/toolkit'
import  clientReducer  from '../Slice/clienSlice'

export default configureStore({
  reducer: {
    clients: clientReducer,
  },
})