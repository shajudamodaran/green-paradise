import React from 'react'
import StatusBadge from '../Statusbadge/StatusBadge'
import './responsivebilllistcard.css'
import moment from 'moment'

function ResponsiveBillListCard({ data, key }) {
    return (
        <div className='bill-list-card'>

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
