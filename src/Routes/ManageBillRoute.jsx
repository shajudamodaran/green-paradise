import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ManageBill from '../Components/ManageBill/ManageBill';
import UpdateInvoiceModal from '../Components/Modal/UpdateInvoiceModal/UpdateInvoiceModal';


function ManageBillRoute() {
    return (
        

                <Switch>
                    <Route exact path="/billing/"><ManageBill /></Route>
                    <Route path="/billing/update"><UpdateInvoiceModal /></Route>
                </Switch>
            
       


    )
}

export default ManageBillRoute
