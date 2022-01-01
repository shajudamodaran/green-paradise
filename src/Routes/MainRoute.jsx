import React from 'react'

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import PdfBill from '../Components/PdfBill/PdfBill';
import BillingPage from '../Pages/BillingPage/BillingPage';
import Homepage from '../Pages/HomePage/Homepage';

function MainRoute() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="billing/printbill" element={<PdfBill/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default MainRoute
