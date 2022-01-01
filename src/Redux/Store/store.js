import { configureStore } from '@reduxjs/toolkit'
import  clientReducer  from '../Slice/clienSlice'
import  invoiceReducer  from '../Slice/invoiceSlice'
import loaderReducer from '../Slice/loaderSlice'

export default configureStore({
  reducer: {
    clients: clientReducer,
    invoices:invoiceReducer,
    loader:loaderReducer
  },
})