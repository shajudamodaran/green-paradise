import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, GET_METHORD, POST_METHORD } from '../../API/methords'
import { setLoaderRedux } from './loaderSlice'


export const invoiceSlice = createSlice({
    name: 'Invoices',
    initialState: {
        invoiceList: [],
        selectedInvoice:null
    },

    reducers: {

        setIncoiceList: (state, action) => {

            state.invoiceList = action.payload
        },

        setSelectedInvoice: (state, action) => {

            state.selectedInvoice = action.payload
        },

    },
})

//...................................................................................................

export function getInvoiceListRedux() {
    return async dispatch => {

        api({ Methord: GET_METHORD, Endpoint: "/invoices" }).then((res) => {
            dispatch(setIncoiceList(res.data.reverse()))
        })
    }
}


export function addInvoiceRedux(invoice_data) {
    return async dispatch => {

        dispatch(setLoaderRedux({
            status:true,
            message:"Saving invoice..."
        }))

        api({ Methord: POST_METHORD, Endpoint: "/addInvoice", Body: invoice_data }).then((res) => {

            console.log(res);
            dispatch(getInvoiceListRedux())

            dispatch(setLoaderRedux({
                status:false,
                message:"Saving invoice..."
            }))



        })
    }
}


export function updateInvoiceListRedux(invoice_data) {
    return async dispatch => {

        dispatch(setLoaderRedux({
            status:true,
            message:"Updating invoice..."
        }))

        api({ Methord: POST_METHORD, Endpoint: "/updateInvoice", Body: invoice_data }).then((res) => {

            console.log(res);
            dispatch(getInvoiceListRedux())

            dispatch(setLoaderRedux({
                status:false,
            }))



        })
    }
}




//.....................................................................................................



export const { setIncoiceList,setSelectedInvoice } = invoiceSlice.actions

export default invoiceSlice.reducer

