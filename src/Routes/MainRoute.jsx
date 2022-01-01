import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import PdfBill from '../Components/PdfBill/PdfBill';
import BillingPage from '../Pages/BillingPage/BillingPage';
import Homepage from '../Pages/HomePage/Homepage';

function MainRoute() {
    return (
        <Router>
            <Switch>
                <Route path="/"><Homepage /></Route>
                {/* <Route path="billing" element={<BillingPage />} />
            <Route path="billing/printbill" element={<PdfBill/>} /> */}
            </Switch>
        </Router>
    )
}

export default MainRoute
