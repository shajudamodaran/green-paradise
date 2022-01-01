import axios from "axios"
import { BASE_URL } from "./config"

export let GET_METHORD = "GET"
export let POST_METHORD = "POST"


export let api = async ({ Header, Methord, Endpoint, Body }) => {

        let body=Body


        if (Methord === GET_METHORD) {

                let result = await axios.get(`${BASE_URL}${Endpoint}`)
                return result

        }
        else if (Methord === POST_METHORD) {
                let result = await axios.post(`${BASE_URL}${Endpoint}`,body)
                return result
        }



}