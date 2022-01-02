import React, { useCallback } from 'react'
import StatusBadge from '../Statusbadge/StatusBadge'
import './responsivebilllistcard.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setSelectedInvoice } from '../../Redux/Slice/invoiceSlice'
import { useHistory } from 'react-router-dom'

function ResponsiveBillListCard({ data, key, isManage }) {

    let dispatch = useDispatch()
    let history = useHistory()


    let handleClick = () => {

        dispatch(setSelectedInvoice(data))
        onClick()

    }

    const onClick = useCallback(() => {
        const to = `/billing/update`
        history.push(to)
    }, [history])




    return (
        <div className='bill-list-card' onClick={() => { isManage ? handleClick() : console.log("nor manager") }}>

            <div className="bill-list-header">
                <span className='bill-list-header-date'>
                    {data.date ? moment(data.date).format("DD MMM YYYY") : "--"}

                    <span className='bill-list-timeago'>{data.date ? moment(data.date).fromNow() : "No date selected"}</span>
                </span>
                <span><StatusBadge paid={data.isPayd} /></span>
            </div>


            <table className="bill-list-card-table">

                <tr>
                    <td>Bill Number</td>
                    <td>:</td>
                    <td>{data.id}</td>
                </tr>

                <tr>
                    <td>Client</td>
                    <td>:</td>
                    <td>{data.client}</td>
                </tr>

                <tr>
                    <td>Amount</td>
                    <td>:</td>
                    <td>₹ {data.total}/-</td>
                </tr>

            </table>

        </div>
    )
}

export default ResponsiveBillListCard
