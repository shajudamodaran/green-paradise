import React, { useEffect, useState } from 'react'
import './newbill.css'
import { Input, Select } from 'antd';
import StatusBadge from '../Statusbadge/StatusBadge';
import AddInvoiceModal from '../Modal/AddInvoiceModal/AddInvoiceModal';
import { api, GET_METHORD } from '../../API/methords';

const { Search } = Input;
const { Option } = Select;

function NewBill() {


    let [addNew, setAddNew] = useState(false)
    let [invoices,setInvoices]=useState([])

    useEffect(() => {

        console.log("Calling");
        api({
            Methord:GET_METHORD,
            Endpoint:"/invoices"
        }).then((res)=>{

            setInvoices(res?res.data:null)

        })
       
    }, [])


    return (
        <div className='new-bill-container'>
            <div className="new-bill-header">

                <div className="invoice-heading">
                    <span className='invoice-heading-tittle'>Invoices</span>
                    <span className='invoice-heading-caption'>List of all of your recent transactions</span>
                </div>


                <button onClick={()=>{setAddNew(true)}}>+ &nbsp; New invoice</button>

            </div>


            <div className="new-bill-search">

                <Search placeholder="Enter keyword to search" style={{ width: "80%" }} />

                <Select placeholder="Select status" style={{ flex: .9 }} >
                    <Option value="jack">Completed</Option>
                    <Option value="lucy">Pending</Option>

                </Select>

            </div>

            <table border={0} className="new-bill-table">
                <tr>
                    <th>Sl.</th>
                    <th>Bill No.</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>

                {
                    invoices.length>0?

                    invoices.map((obj,key)=>{
                        return(

                            <tr key={key}>
                            <td>{key+1}</td>
                            <td>{obj.id}</td>
                            <td>{obj.date?obj.date:"--"}</td>
                            <td>{obj.client}</td>
                            <td>₹ {obj.total}/-</td>
                            <td><StatusBadge paid={obj.isPayd} /></td>
                        </tr>

                        )
                    })

                    :null
                }

               
               
            </table>


            <AddInvoiceModal state={addNew} setState={setAddNew} />
        </div>
    )
}

export default NewBill
