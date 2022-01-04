import React, { useEffect, useState } from 'react'
import './newbill.css'
import { Input, Pagination, Select } from 'antd';
import StatusBadge from '../Statusbadge/StatusBadge';
import AddInvoiceModal from '../Modal/AddInvoiceModal/AddInvoiceModal';
import { api, GET_METHORD } from '../../API/methords';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceListRedux } from '../../Redux/Slice/invoiceSlice';
import ResponsiveBillListCard from '../ResponsiveBillListCard/ResponsiveBillListCard';
import moment from 'moment'

const { Search } = Input;
const { Option } = Select;

function NewBill() {

    let { invoiceList } = useSelector((state) => state.invoices)
    let { clientsList } = useSelector((state) => state.clients)


    let [addNew, setAddNew] = useState(false)
    let [invoices, setInvoices] = useState([])
    let [filterString, setFilterString] = useState(null)
    let [filterStatus, setFilterStatus] = useState(null)

    let filterData = (masterData) => {

        let response = [...masterData]


        if (response.length>0) 
        {
            let sorder = response.sort(function(a, b){
      
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


    let [pagination, setPagination] = useState({
        totalData: filterData(invoiceList).length,
        restriction: 5,
        active: 1
    })

    const dispatch = useDispatch()




    useEffect(() => {


        dispatch(getInvoiceListRedux())

    }, [])

    useEffect(() => {

        console.log("Calling");
        api({
            Methord: GET_METHORD,
            Endpoint: "/invoices"
        }).then((res) => {

            setInvoices(res ? res.data : null)

        })

    }, [])





    return (
        <div className='new-bill-container'>
            <div className="new-bill-header">

                <div className="invoice-heading">
                    <span className='invoice-heading-tittle'>Invoices</span>
                    <span className='invoice-heading-caption'>List of all of your recent transactions</span>
                </div>


                <button onClick={() => { setAddNew(true) }}>+ &nbsp; New invoice</button>

            </div>


            <div className="new-bill-search">

                <Search value={filterString} onChange={(e) => { setFilterString(e.target.value) }} placeholder="Enter keyword to search" style={{ width: "80%", marginRight: ".5rem" }} />

                <Select onChange={e => setFilterStatus(e)} placeholder="Select status" style={{ flex: .9 }} >
                    <Option value={null}>All</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="pending">Pending</Option>

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

                    invoiceList.length > 0 ?

                        filterData(invoiceList).map((obj, key) => {

                            if (key + 1 >= (pagination.active * pagination.restriction) - pagination.restriction + 1 && key + 1 <= (pagination.active * pagination.restriction)) {
                                return (

                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{obj.id}</td>
                                        <td>{obj.date ? moment(obj.date).format("DD MMM YYYY")  : "No date seleced"}</td>
                                        <td>{clientsList.length>0?clientsList[obj.client].name:null}</td>
                                        <td>₹ {obj.total}/-</td>
                                        <td><StatusBadge paid={obj.isPayd} /></td>
                                    </tr>

                                )
                            }

                        })

                        : null
                }


            </table>

            <div className="new-bill-list-responsive">

                {

                    invoiceList.length > 0 ?

                        filterData(invoiceList).map((obj, key) => {


                            return (

                                <ResponsiveBillListCard data={obj} key={key} />

                            )


                        })

                        : null
                }

            </div>

            <div className="pagination-container">


                <Pagination
                    defaultCurrent={1}
                    onChange={(e) => { setPagination({ ...pagination, active: e }) }}
                    defaultPageSize={pagination.restriction}
                    total={filterData(invoiceList).length} />

            </div>




            <AddInvoiceModal state={addNew} setState={setAddNew} />
        </div>
    )
}

export default NewBill
