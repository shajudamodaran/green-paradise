import { DatePicker, Input, InputNumber, Popover, Button, AutoComplete, Tooltip, Select } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AddClient, CloseIcon, DeleteIcon, DeleteIconWhite, LeftArrow, PrintIcon, SaveIcon } from '../../../Assets/Icons/Icons'
import { calculateDiscountPrice, calculateNetTotal, calculateSubTotal } from '../../../Helpers/calculations'
import { generateInvoiceId } from '../../../Helpers/invoiceIdGenerator'
import { addClientRedux } from '../../../Redux/Slice/clienSlice'
import moment from 'moment'
import './updateinvoice.css'
import ResponsiveBillListCard from '../../ResponsiveBillListCard/ResponsiveBillListCard'
import { updateInvoiceListRedux } from '../../../Redux/Slice/invoiceSlice'
import { useReactToPrint } from 'react-to-print'

import logo1 from '../../../Assets/Images/Green paradise/logo1.png'
import logo2 from '../../../Assets/Images/Green paradise/logo2.png'
import logo3 from '../../../Assets/Images/Green paradise/logo3.png'

import { Switch } from 'antd';
import { INVOICE, QUOTATION } from '../../../Constants/Strings'

const { Option } = Select;

const { TextArea } = Input;

function UpdateInvoiceModal() {

    let dispatch = useDispatch()
    let { clientsList } = useSelector((state) => state.clients)
    let { invoiceList, selectedInvoice } = useSelector((state) => state.invoices)

    let history = useHistory()

    let [selectedData, setSelecetdData] = useState(selectedInvoice ? { ...selectedInvoice } : null)
    let [localItems, setLocalItems] = useState(selectedData ? [...selectedData.items] : [])
    let [discounts, setDiscount] = useState(selectedData ? [...selectedData.discounts] : [])
    let [taxes, setTax] = useState(selectedData ? [...selectedData.tax] : [])

    let [billdate, setBilldate] = useState(null)
    let [billClient, setBillClient] = useState(null)
    let [clientOnAir, setClientOnAir] = useState({ name: "", address: "" })
    let [addClient, setAddClient] = useState(false)
    let [subTotal, setSubTotal] = useState(0)

    let [addTax, setAddtax] = useState(false)
    let [taxOnAir, setTaxOnAir] = useState({ name: "", rate: "" })
    let [addDiscount, setAddDiscount] = useState(false)
    let [discountOnAir, setDiscountOnAir] = useState({ name: "", rate: "" })
    let [netTotal, setNetTotal] = useState(0)

    let [filterString, setFilterString] = useState(null)
    let [filterStatus, setFilterStatus] = useState(null)

    let [isInvoice,setIsInvoice]=useState(true)

    useEffect(() => {

        setSubTotal(calculateSubTotal(localItems))

    }, [localItems, discounts, taxes])

    useEffect(() => {
        setNetTotal(calculateNetTotal(subTotal, discounts, taxes))
    }, [subTotal, discounts, taxes])



    let handleVisibleChangeAddClient = visible => {
        setAddClient({ visible });
    }

    let handleVisibleChange = visible => {
        setAddDiscount({ visible });
    }

    let handleVisibleChange2 = visible => {
        setAddtax({ visible });
    }


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


    let removeTax = ({ name }) => {

        let newArray = [...taxes]
        let result = newArray.filter(element => element.name !== name)
        setTax(result)

    }

    let removeDiscount = ({ name }) => {

        let newArray = [...discounts]
        let result = newArray.filter(element => element.name !== name)
        setDiscount(result)

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


    let updateData = ({ id, key, value }) => {


        let newArray = JSON.parse(JSON.stringify(localItems));
        newArray[id][key] = value
        setLocalItems(newArray)

    }

    console.log(localItems);


    let removeitem = ({ id }) => {

        let newArray = [...localItems]
        let result = newArray.filter(element => element.id !== id)
        setLocalItems(result)

    }


    let updateDate = (data) => {

        let newArray = JSON.parse(JSON.stringify(selectedData));
        newArray["date"] = data
        setSelecetdData(newArray)

    }

    let updateClient = (data) => {

        let newArray = JSON.parse(JSON.stringify(selectedData));
        newArray["client"] = data
        setSelecetdData(newArray)

    }

    let filterData = (masterData) => {

        let response = [...masterData]


        if (response.length > 0) {
            let sorder = response.sort(function (a, b) {

                return a.date - b.date;
            });


            response = sorder

        }


        if (filterString) {
            response = masterData.filter(element => element.client.toLowerCase().includes(filterString.toLowerCase()) || element.id.includes(filterString) || element.total.toString().includes(filterString))

        }

        if (filterStatus === "pending") {
            response = response.filter(element => element.isPayd === null)
        }
        else if (filterStatus === "completed") {
            response = response.filter(element => element.isPayd === true)
        }


        return (response)

    }


    useEffect(() => {

        return () => {
            onClickSetPath()
        }
    }, [])

    const onClickSetPath = useCallback(() => {
        const to = `/billing/`
        history.push(to)
    }, [history])


    let handleUpdateDb = () => {

        let data = {
            id: selectedData.id,
            client: selectedData.client,
            isPayd: selectedData.isPayd,
            date: selectedData.date,
            total: netTotal,
            items: localItems,
            discounts: discounts,
            tax: taxes
        }

        dispatch(updateInvoiceListRedux(data))


    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    console.log(selectedData);



    return (
        <div className='update-invoice-container'>

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
                                    Erumapetty kariyanoor <br></br>
                                    Thrissur, Kerala <br></br>
                                    Mobile : +91 9656535398<br></br>
                                    greenparadise438@gmail.com<br></br>
                                </span>
                            </div>


                            <div className="bill-body-to">

                                <div className="bill-body-to-tittle">Bill to :</div>
                                <span className="bill-body-to-caption">{clientsList.length > 0 ? `${clientsList[selectedData.client].name + '\n' + clientsList[selectedData.client].address}` : null}</span>

                            </div>

                            <div className="bill-body-date">

                                {console.log(`${clientsList[selectedData.client].name + '\n' + clientsList[selectedData.client].address}`)}

                                <div className="bill-body-to-tittle">Date :</div>
                                <div className="bill-body-to-caption">{selectedData.date ? moment(selectedData.date).format("DD MMM YYYY") : null}</div>

                            </div>





                        </div>


                        <div className="bill-body">



                            <div className="bill-body-invoice-number">
                                <div className='invoice-name-tittle'>{isInvoice?INVOICE:QUOTATION} - #{selectedData.id}</div>
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

            <div className="back-to-manage">
                <div className="d-flex-flex-center" onClick={() => { history.goBack() }}>
                    <LeftArrow />
                    <span> Back to manage bill</span>
                </div>
            </div>

            <div className="manage-invoice-header">

                <div className="add-invoice-date-header">

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}
                    ><span className='responsive'>Date  &nbsp; </span><DatePicker defaultValue={selectedData ? moment(selectedData.date) : null} inputReadOnly onChange={(date) => { updateDate(date) }} /></div>
                    <div
                        className='responsive-client-name-select'
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>

                        <span className='responsive'>Client Name &nbsp;</span>
                        <Select
                            defaultValue={selectedData ? clientsList.length > 0 ? clientsList[selectedData.client].name : null : null}
                            onChange={(e) => { updateClient(e) }}
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
                <span className='add-invoice-tittle'>{isInvoice?INVOICE:QUOTATION}- #{selectedData ? selectedData.id : "---"}</span>
                <div className='switch-container'>
                    <Switch defaultChecked onChange={()=>{setIsInvoice(!isInvoice)}} />
                    <span> ( Switch Invoice or Quotation ) </span>
                </div>

            </div>

            <div className="add-invoice-buttons">
                <button onClick={addNewItem}>+ &nbsp; Add Items</button>
            </div>

            <div className="add-invoice-body">


                {
                    localItems.length > 0 ?

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
                                                <td><TextArea value={obj.service} onChange={(e) => { updateData({ id: key, key: "service", value: e.target.value }) }} placeholder='Enter item details' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                <td><TextArea value={obj.quantity} onChange={(e) => { updateData({ id: key, key: "quantity", value: e.target.value }) }} placeholder='Qty' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                <td><TextArea value={obj.rate} onChange={(e) => { updateData({ id: key, key: "rate", value: e.target.value }) }} placeholder='Rate' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                <td><TextArea value={obj.rate && obj.quantity ? obj.rate * obj.quantity : 0} placeholder='Total' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                <td><TextArea value={obj.comment} onChange={(e) => { updateData({ id: obj.id, key: "comment", value: e.target.value }) }} placeholder='Comment if any' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                <td><div onClick={() => { removeitem({ id: obj.id }) }}><DeleteIcon /></div></td>

                                            </tr>

                                        )
                                    })

                                    : null

                            }






                        </table>

                        :

                        <div className="no-item-div-container">
                            ( No items added to invoice )
                        </div>
                }

            </div>

            <div className="add-inoice-body-responsive">

                {
                    localItems.length > 0 ?

                        <div className="add-invoice-table-responsive">



                            {
                                localItems.length > 0 ?

                                    localItems.map((obj, key) => {
                                        return (

                                            // <tr key={key}>
                                            //     <td>{key + 1}</td>
                                            //     <td><TextArea value={obj.service} onChange={(e) => { updateData({ id: obj.id, key: "service", value: e.target.value }) }} placeholder='Enter item details' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                            //     <td><TextArea value={obj.quantity} onChange={(e) => { updateData({ id: obj.id, key: "quantity", value: e.target.value }) }} placeholder='Qty' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                            //     <td><TextArea value={obj.rate} onChange={(e) => { updateData({ id: obj.id, key: "rate", value: e.target.value }) }} placeholder='Rate' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                            //     <td><TextArea value={obj.rate && obj.quantity ? obj.rate * obj.quantity : 0} placeholder='Total' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                            //     <td><TextArea value={obj.comment} onChange={(e) => { updateData({ id: obj.id, key: "comment", value: e.target.value }) }} placeholder='Comment if any' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                            //     <td><div onClick={() => { removeitem({ id: obj.id }) }}><DeleteIcon /></div></td>

                                            // </tr>

                                            <div className="add-invoice-item-responsive">
                                                <table>
                                                    <tr>
                                                        <td>Item</td>
                                                        <td>:</td>
                                                        <td><TextArea value={obj.service} onChange={(e) => { updateData({ id: obj.id, key: "service", value: e.target.value }) }} placeholder='Enter item details' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Qty</td>
                                                        <td>:</td>
                                                        <td><TextArea inputmode="numeric" value={obj.quantity} onChange={(e) => { updateData({ id: obj.id, key: "quantity", value: e.target.value }) }} placeholder='Qty' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Rate</td>
                                                        <td>:</td>
                                                        <td><TextArea inputmode="numeric" value={obj.rate} onChange={(e) => { updateData({ id: obj.id, key: "rate", value: e.target.value }) }} placeholder='Rate' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Total</td>
                                                        <td>:</td>
                                                        <td><TextArea value={obj.rate && obj.quantity ? obj.rate * obj.quantity : 0} placeholder='Total' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "80px", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Comment</td>
                                                        <td>:</td>
                                                        <td><TextArea value={obj.comment} onChange={(e) => { updateData({ id: obj.id, key: "comment", value: e.target.value }) }} placeholder='Comment if any' autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: "95%", height: "fit-content" }} className='add-invoice-table-text-area' /></td>
                                                    </tr>


                                                </table>

                                                <button onClick={() => { removeitem({ id: obj.id }) }} className='remove-button'> <DeleteIconWhite /> Remove Item </button>
                                            </div>

                                        )
                                    })


                                    : null

                            }


                        </div>

                        :

                        <div className="no-item-div-container">
                            ( No items added to invoice )
                        </div>
                }

            </div>

            <div className="add-invoice-footer">

                <div className="add-invoice-actions">



                    <button onClick={handleUpdateDb} className='save-button'>Update <SaveIcon /></button>
                    <button onClick={handlePrint} className='save-print-button'>Print <PrintIcon /></button>
                    <button className='close-button'>Discard <CloseIcon /></button>

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
    )
}

export default UpdateInvoiceModal
