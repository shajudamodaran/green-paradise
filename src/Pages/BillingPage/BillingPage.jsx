import React, { useState } from 'react'
import NewIcon, { LogoutIcon, ReportsIcon } from '../../Assets/Icons/Icons'
import { ManageBillIcon } from '../../Assets/Icons/Icons'
import NewBill from '../../Components/NewBill/NewBill'
import './billingpage.css'

function BillingPage() {

    let leftMenus = [
        {
            name: "New Bill",
            icon: <NewIcon />,
            element:<NewBill/>
        },
        {
            name: "Manage Bill",
            icon: <ManageBillIcon />,
            element:null
        },
        {
            name: "Reports",
            icon: <ReportsIcon />,
            element:null
        }

    ]
    let [activeLeft, setActiveLeft] = useState(leftMenus[0])


    

    return (
        <div className="bill-page-container">

            <div className="left-nav">

                <div className="company-logo-container">
                    Logo
                </div>

                <ul>

                    {
                        leftMenus.map((element, key) => {
                            return (

                                <li
                                    key={key}
                                    className={activeLeft.name === element.name ? 'active' : null}
                                    onClick={() => { setActiveLeft(element) }}
                                >
                                    <div className="nav-icon">
                                        {element.icon}
                                    </div>
                                    {element.name}
                                </li>

                            )
                        })
                    }

                </ul>

            </div>


            <div className="right-content">
                <div className="content-header">
                    <span className='content-tittle'>
                        {activeLeft.name}
                    </span>


                    <span className='logout-container'><LogoutIcon /> Sign out</span>
                </div>

                {
                    activeLeft.element
                }


            </div>

        </div>
    )
}

export default BillingPage
