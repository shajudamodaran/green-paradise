import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, GET_METHORD, POST_METHORD } from '../../API/methords'




export const clientSlice = createSlice({
    name: 'Clients',
    initialState: {
        clientsList: [],
    },

    reducers: {
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },

        setClientsRedux: (state, action) => {

            state.clientsList=action.payload
        },

    },
})

//...................................................................................................

export function fetchRecipes() {
    return async dispatch => {

        api({Methord:GET_METHORD,Endpoint:"/clients"}).then((res)=>{
            dispatch(setClientsRedux(res.data))
        })
    }
  }

  export function addClientRedux(clientData) {
    return async dispatch => {

        let header={"Access-Control-Allow-Origin":"*"}

        api({Methord:POST_METHORD,Endpoint:"/clients",Body:clientData, header}).then((res)=>{

            dispatch(fetchRecipes())
            

           
        })
    }
  }


 
//.....................................................................................................



export const { incrementByAmount,setClientsRedux } = clientSlice.actions

export default clientSlice.reducer
