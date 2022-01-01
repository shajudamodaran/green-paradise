import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const loaderSlice = createSlice({
    name: 'Loader',
    initialState: {
        loader:{status:false,message:"Loading ..."},
    },

    reducers: {
       

        setLoaderRedux: (state, action) => 
        {
            let {status,message}=action.payload
            state.loader={status:status,message:message?message:"Loading..."}
        },

    },
})



export const { setLoaderRedux} = loaderSlice.actions

export default loaderSlice.reducer
