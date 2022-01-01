import React from 'react'
import './pdfbill.css'

import logo1 from '../../Assets/Images/Green paradise/logo1.png'
import logo2 from '../../Assets/Images/Green paradise/logo2.png'
import logo3 from '../../Assets/Images/Green paradise/logo3.png'

function PdfBill({ref}) {




    return (
        <div className='pdf-bill-container ' ref={ref}>

            <div className='pdf-bill-container-inner'>


                <div className="bill-hearer">

                    <div className="from-logo">
                        <img className='bill-logo' src={logo2} alt="" />
                    </div>


                    <div className="bill-body-to">

                        <div className="bill-body-to-tittle">Bill to :</div>
                        <div className="bill-body-to-caption">IIB Education Pvt. Ltd</div>

                    </div>

                    <div className="bill-body-to">

                        <div className="bill-body-to-tittle">Date :</div>
                        <div className="bill-body-to-caption">02 Jan 2022</div>

                    </div>

                    <div className="bill-from-address">
                        <span className='bill-header-tittle'>GREEN PARADISE</span>
                        <span className='bill-header-caption'>
                            Dummy Address <br></br>
                            Dummy place <br></br>
                            Telephone : 1-800-123-4567<br></br>
                            Email : info@dummy.com<br></br>
                        </span>
                    </div>



                </div>


                <div className="bill-body">

                    {/* <div className="bill-body-header">

                    <div className="bill-body-to">

                        <div className="bill-body-to-tittle">Bill to :</div>
                        <div className="bill-body-to-caption">IIB Education Pvt. Ltd</div>

                    </div>



                    <div className="bill-body-to">

                        <div className="bill-body-to-tittle">Date :</div>
                        <div className="bill-body-to-caption">02 Jan 2022</div>

                    </div>

                </div> */}

                    <div className="bill-body-invoice-number">
                        <div className='invoice-name-tittle'>INVOICE - #SH123</div>
                    </div>


                    <div className="bill-table-container">
                        <table className="bill-table">
                            <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Unit Coast</th>
                                <th>QTY/HR rate</th>
                                <th>Amount</th>
                            </tr>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nameboard forex (3*4)</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Nameboard forex (3*4)</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>Nameboard forex (3*4)</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>

                                <tr>
                                    <td>4</td>
                                    <td>Nameboard forex (3*4)</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="sub-total-table-container">

                        <div className="netTotal-container">

                            <div>" Thankyou for your business. "</div>


                        </div>


                        <table className="subtotal-table">
                            <tr>
                                <td>Subtotal</td>
                                <td></td>
                                <td>₹ 10000.00</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className='sub-total-heading-row'>Tax</td>

                            </tr>

                            <tr>
                                <td>GST (18%)</td>
                                <td></td>
                                <td>₹ 500.00</td>
                            </tr>

                            <tr>
                                <td colSpan={3} className='sub-total-heading-row'>Discounts</td>

                            </tr>

                            <tr>
                                <td>New User Discount (50%)</td>
                                <td></td>
                                <td>₹ 1000.00</td>
                            </tr>

                            <tr >
                                <td>Invoice total</td>
                                <td></td>
                                <td>₹ 1000.00</td>
                            </tr>
                        </table>
                    </div>


                </div>

                <div className="bill-footer">
                    If you have any payment related or other doubts, please feel free to contact the above given number in address or to <br></br> Mr. Vishnu KM :+91 9605983430
                </div>



            </div>

        </div>
    )
}

export default PdfBill
