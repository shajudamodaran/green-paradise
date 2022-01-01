import React from 'react'
import './statusbadge.css'

function StatusBadge({paid}) {



    return (
        <span className={paid?"statusbadge-container-completed":"statusbadge-container-pending"}>
           {
               paid?"Completed":"Pending"
           }
        </span>
    )
}

export default StatusBadge
