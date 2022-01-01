import { DatePicker, Input, InputNumber, Popover, Button, AutoComplete, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import '../../Modal/Modal.css'
import './addinvoice.css'
import moment from 'moment'

import { Select } from 'antd';
import { AddClient, CloseIcon, DeleteIcon, PrintIcon, SaveIcon, SavePrintIcon } from '../../../Assets/Icons/Icons';
import { dummyInvoice } from '../../../Firebase/Config';
import { api, GET_METHORD } from '../../../API/methords';
import { calculateDiscountPrice, calculateNetTotal, calculateSubTotal } from '../../../Helpers/calculations';
import { dummyClients } from '../../../Constants/constants';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import PdfBill from '../../PdfBill/PdfBill';

import logo1 from '../../../Assets/Images/Green paradise/logo1.png'
import logo2 from '../../../Assets/Images/Green paradise/logo2.png'
import logo3 from '../../../Assets/Images/Green paradise/logo3.png'
import { useDispatch, useSelector } from 'react-redux'
import { addClientRedux, fetchRecipes, setClientsRedux } from '../../../Redux/Slice/clienSlice'

const { Option } = Select;

const { TextArea } = Input;


function AddInvoiceModal({ state, setState }) {

    let dispatch = useDispatch()
    let { clientsList } = useSelector((state) => state.clients)

    useEffect(() => {

        dispatch(fetchRecipes())

    }, [])


    let items = [
        {
            id: 0,
            service: "",
            quantity: "",
            rate: "",
            total: "",
            comment: "",
        }
    ]

    let [localItems, setLocalItems] = useState(items)
    let [discounts, setDiscount] = useState([])
    let [taxes, setTax] = useState([])
    let [addDiscount, setAddDiscount] = useState(false)
    let [discountOnAir, setDiscountOnAir] = useState({ name: "", rate: "" })
    let [addTax, setAddtax] = useState(false)
    let [taxOnAir, setTaxOnAir] = useState({ name: "", rate: "" })
    let [subTotal, setSubTotal] = useState(0)
    let [netTotal, setNetTotal] = useState(0)
    let [billdate, setBilldate] = useState(null)
    let [billClient, setBillClient] = useState(null)

    let [addClient, setAddClient] = useState(false)
    let [clientOnAir, setClientOnAir] = useState({ name: "", address: "" })

    let handleVisibleChange = visible => {
        setAddDiscount({ visible });
    }

    let handleVisibleChange2 = visible => {
        setAddtax({ visible });
    }


    let handleVisibleChangeAddClient = visible => {
        setAddClient({ visible });
    }

    useEffect(() => {

        setSubTotal(calculateSubTotal(localItems))

    }, [localItems, discounts, taxes])

    useEffect(() => {
        setNetTotal(calculateNetTotal(subTotal, discounts, taxes))
    }, [subTotal, discounts, taxes])



    let addNewItem = () => {

        localItems ? setLocalItems([...localItems, {
            id: localItems.length,
            service: "",
            quantity: "",
            rate: "",
            total: "",
            comment: "",
        }]) : setLocalItems([{
            id: localItems.length,
            service: "",
            quantity: "",
            rate: "",
            total: "",
            comment: "",
        }])

    }

    let updateData = ({ id, key, value }) => {

        let newArray = [...localItems]
        newArray[id][key] = value
        setLocalItems(newArray)

    }


    let addDiscountForm = () => {
        return (
            <div>
                <Input value={discountOnAir.name} onChange={(e) => { setDiscountOnAir({ ...discountOnAir, name: e.target.value }) }} width={100} placeholder="Discount name" style={{ marginBottom: ".8rem" }} />
                <Input value={discountOnAir.rate} onChange={(e) => { setDiscountOnAir({ ...discountOnAir, rate: e.target.value }) }} placeholder="Discount percentage eg:50" style={{ marginBottom: ".8rem" }} />

                <div className='flex-right'>

                    <Button onClick={() => { setAddDiscount(false) }} danger>Close</Button>
                    <Button onClick={() => {
                        setDiscount([...discounts, discountOnAir]); setAddDiscount(false)
                    }} type="primary" style={{ marginLeft: ".8rem" }}>Add discount</Button>
                </div>


            </div>
        )
    }

    let addTaxForm = () => {
        return (
            <div>
                <Input value={taxOnAir.name} onChange={(e) => { setTaxOnAir({ ...taxOnAir, name: e.target.value }) }} width={100} placeholder="Tax name" style={{ marginBottom: ".8rem" }} />
                <Input value={taxOnAir.rate} onChange={(e) => { setTaxOnAir({ ...taxOnAir, rate: e.target.value }) }} placeholder="Tax percentage eg:50" style={{ marginBottom: ".8rem" }} />

                <div className='flex-right'>

                    <Button onClick={() => { setAddtax(false) }} danger>Close</Button>
                    <Button onClick={() => {
                        setTax([...taxes, taxOnAir]); setAddtax(false)
                    }} type="primary" style={{ marginLeft: ".8rem" }}>Add tax</Button>
                </div>


            </div>
        )
    }

    let addClientForm = () => {
        return (
            <div>
                <Input value={clientOnAir.name} onChange={(e) => { setClientOnAir({ ...clientOnAir, name: e.target.value }) }} width={100} placeholder="Client name" style={{ marginBottom: ".8rem" }} />
                <TextArea rows={5} value={clientOnAir.address} onChange={(e) => { setClientOnAir({ ...clientOnAir, address: e.target.value }) }} placeholder="Client address" style={{ marginBottom: ".8rem" }} />

                <div className='flex-right'>

                    <Button onClick={() => { setAddClient(false) }} danger>Close</Button>

                    <Button onClick={() => {

                        dispatch(addClientRedux({ name: clientOnAir.name, address: clientOnAir.address }))
                        setAddClient(false)

                    }} type="primary" style={{ marginLeft: ".8rem" }}>Add Client</Button>
                </div>


            </div>
        )
    }




    let removeitem = ({ id }) => {

        let newArray = [...localItems]
        let result = newArray.filter(element => element.id !== id)
        setLocalItems(result)

    }

    let removeDiscount = ({ name }) => {

        let newArray = [...discounts]
        let result = newArray.filter(element => element.name !== name)
        setDiscount(result)

    }



    let removeTax = ({ name }) => {

        let newArray = [...taxes]
        let result = newArray.filter(element => element.name !== name)
        setTax(result)

    }


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <div>

            <div style={{ display: "none" }}>
                <div className='pdf-bill-container ' ref={componentRef}>

                    <div className='pdf-bill-container-inner'>


                        <div className="bill-hearer">

                            <div className="from-logo">
                                <img className='bill-logo' src={logo2} alt="" />
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


                            <div className="bill-body-to">

                                <div className="bill-body-to-tittle">Bill to :</div>
                                <div className="bill-body-to-caption">IIB Education Pvt. Ltd</div>

                            </div>

                            <div className="bill-body-to">

                                <div className="bill-body-to-tittle">Date :</div>
                                <div className="bill-body-to-caption">{billdate ? moment(billdate).format("DD MMM YYYY") : null}</div>

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

                                        {
                                            localItems.length > 0 ?

                                                localItems.map((element, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{element.service}</td>
                                                            <td>{element.quantity}</td>
                                                            <td>{element.rate}</td>
                                                            <td>{element.quantity * element.rate}</td>
                                                        </tr>
                                                    )
                                                })

                                                : null
                                        }

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
                                        <td>₹ {subTotal}</td>
                                    </tr>

                                    {
                                        taxes.length > 0 ?

                                            <tr>
                                                <td colSpan={3} className='sub-total-heading-row'>Tax</td>

                                            </tr> : null
                                    }

                                    {
                                        taxes.length > 0 ?

                                            taxes.map((element, key) => {
                                                return (

                                                    <tr key={key}>
                                                        <td>{element.name} ({element.rate})</td>
                                                        <td></td>
                                                        <td>₹ {subTotal * (element.rate / 100)}/-</td>
                                                    </tr>

                                                )
                                            })

                                            : null
                                    }

                                    {
                                        discounts.length > 0 ?

                                            <tr>
                                                <td colSpan={3} className='sub-total-heading-row'>Discounts</td>

                                            </tr>

                                            : null
                                    }

                                    {
                                        discounts.length > 0 ?

                                            discounts.map((element, key) => {
                                                return (

                                                    <tr key={key}>
                                                        <td>{element.name} ({element.rate}%)</td>
                                                        <td></td>
                                                        <td>₹ {calculateDiscountPrice(subTotal, element.rate, taxes)}</td>
                                                    </tr>

                                                )
                                            })


                                            : null
                                    }





                                    <tr >
                                        <td>Invoice total</td>
                                        <td></td>
                                        <td>₹ {netTotal}</td>
                                    </tr>
                                </table>
                            </div>


                        </div>

                        <div className="bill-footer">
                            If you have any payment related or other doubts, please feel free to contact the above given number in address or to <br></br> Mr. Vishnu KM :+91 9605983430
                        </div>



                    </div>

                </div>
            </div>


            {
                state ?

                    <div className="modal" >
                        <div className="modal-body">
                            <div className="add-invoice-header">

                                <div className="add-invoice-date-header">

                                    <div>Date &nbsp; <DatePicker onChange={(date) => { setBilldate(date) }} /></div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>Client Name &nbsp;
                                        <Select
                                        allowClear
                                            showSearch
                                            optionFilterProp="children"


                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().startsWith(input.toLowerCase()) ? true : false
                                            }

                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }

                                            placeholder="Select client" style={{ width: "fit-content", minWidth: 200 }} >
                                            {
                                                clientsList.length > 0 ?

                                                    clientsList.map((element, key) => {
                                                        return (
                                                            <Option key={key} value={element.name}>{element.name}</Option>

                                                        )
                                                    })


                                                    : null
                                            }
                                        </Select>



                                        <Popover
                                            content={addClientForm}
                                            title="Add new client"
                                            trigger="click"
                                            visible={addClient}
                                            onVisibleChange={handleVisibleChangeAddClient}
                                        >
                                            <Tooltip placement="topRight" title="Add new client">
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    cursor: "pointer"
                                                }}>
                                                    <AddClient />
                                                </div>
                                            </Tooltip>
                                        </Popover>


                                    </div>

                                </div>

                                <span className='add-invoice-tittle'>INVOICE - #SH123</span>

                            </div>

                            <div className="add-invoice-body">

                                <div className="add-invoice-buttons">
                                    <button onClick={addNewItem}>+ &nbsp; Add Items</button>
                                </div>


                                <table className="add-invoice-table">

                                    <tr>
                                        <th>#</th>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                        <th>Comment</th>
                                        <th>Action</th>
                                    </tr>

                                    {
                                        localItems.length > 0 ?

                                            localItems.map((obj, key) => {
                                                return (

                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td><TextArea value={obj.service} onChange={(e) => { updateData({ id: obj.id, key: "service", value: e.target.value }) }} placeholder='Enter item details' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                        <td><TextArea value={obj.quantity} onChange={(e) => { updateData({ id: obj.id, key: "quantity", value: e.target.value }) }} placeholder='Qty' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                        <td><TextArea value={obj.rate} onChange={(e) => { updateData({ id: obj.id, key: "rate", value: e.target.value }) }} placeholder='Rate' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                        <td><TextArea value={obj.rate && obj.quantity ? obj.rate * obj.quantity : 0} placeholder='Total' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                        <td><TextArea value={obj.comment} onChange={(e) => { updateData({ id: obj.id, key: "comment", value: e.target.value }) }} placeholder='Comment if any' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                        <td><div onClick={() => { removeitem({ id: obj.id }) }}><DeleteIcon /></div></td>

                                                    </tr>

                                                )
                                            })


                                            : null
                                    }






                                </table>

                            </div>

                            <div className="add-invoice-footer">

                                <div className="add-invoice-actions">



                                    <button onClick={handlePrint} className='save-print-button'>Save & Print <PrintIcon /></button>
                                    <button className='save-button'>Save <SaveIcon /></button>
                                    <button onClick={() => { setState(false) }} className='close-button'>Close <CloseIcon /></button>

                                </div>

                                <div className="sub-total-container">


                                    <div className="sub-total">
                                        <table className="calculation-table">
                                            <tr>

                                                <td>Subtotal</td>
                                                <td></td>
                                                <td></td>
                                                <td>{subTotal}/-</td>
                                            </tr>

                                            {
                                                taxes.length > 0 ?

                                                    taxes.map((element, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td> <div onClick={() => { removeTax({ name: element.name }) }}><DeleteIcon /></div> </td>
                                                                <td>{element.name}</td>
                                                                <td>{element.rate}%</td>
                                                                <td>{subTotal * (element.rate / 100)}/-</td>
                                                            </tr>
                                                        )
                                                    })


                                                    : null

                                            }

                                            <tr>

                                                <td colSpan={4} className='add-discount'>
                                                    <Popover
                                                        content={addTaxForm}
                                                        title="Add Tax"
                                                        trigger="click"
                                                        visible={addTax}
                                                        onVisibleChange={handleVisibleChange2}
                                                    >
                                                        + Add tax</Popover>
                                                </td>

                                            </tr>

                                            {
                                                discounts.length > 0 ?

                                                    discounts.map((element, key) => {
                                                        return (
                                                            <tr key={key}>

                                                                <td> <div onClick={() => { removeDiscount({ name: element.name }) }}><DeleteIcon /></div> </td>
                                                                <td>

                                                                    <div></div>
                                                                    {element.name}

                                                                </td>
                                                                <td>{element.rate}%</td>
                                                                <td>-{calculateDiscountPrice(subTotal, element.rate, taxes)}/-</td>
                                                            </tr>
                                                        )
                                                    })


                                                    : null
                                            }

                                            <tr>


                                                <td colSpan={4} className='add-discount'>

                                                    <Popover
                                                        content={addDiscountForm}
                                                        title="Add discount"
                                                        trigger="click"
                                                        visible={addDiscount}
                                                        onVisibleChange={handleVisibleChange}
                                                    >
                                                        + Add discount</Popover>
                                                </td>

                                            </tr>


                                        </table>
                                    </div>

                                    <div className="sub-total">
                                        <table className="calculation-table">
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td></td>
                                                <td></td>
                                                <td><b>₹ {netTotal}/-</b></td>
                                            </tr>

                                        </table>
                                    </div>



                                </div>

                            </div>



                        </div>
                    </div > : null
            }






        </div >
    )
}

export default AddInvoiceModal
