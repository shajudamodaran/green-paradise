import React, { useState } from 'react'
import NewIcon, { CloseIconMedium, LogoutIcon, OptionsIcon, ReportsIcon } from '../../Assets/Icons/Icons'
import { ManageBillIcon } from '../../Assets/Icons/Icons'
import NewBill from '../../Components/NewBill/NewBill'
import './billingpage.css'

import logo1 from '../../Assets/Images/Green paradise/logo1.png'
import logo2 from '../../Assets/Images/Green paradise/logo2.png'
import logo3 from '../../Assets/Images/Green paradise/logo3.png'

function BillingPage() {


    let [isLeft, setLeft] = useState(false)

    let leftMenus = [
        {
            name: "New Bill",
            icon: <NewIcon />,
            element: <NewBill state={isLeft} setState={setLeft} />
        },
        {
            name: "Manage Bill",
            icon: <ManageBillIcon />,
            element: null
        },
        {
            name: "Reports",
            icon: <ReportsIcon />,
            element: null
        }

    ]
    let [activeLeft, setActiveLeft] = useState(leftMenus[0])




    return (
        <div className="bill-page-container">

            <div className={`left-nav`}>

                <div className="company-logo-container" >
                    <div className="logo-box">

                        <img src={logo2} alt="" />

                    </div>
                </div>

                <ul>

                    {
                        leftMenus.map((element, key) => {
                            return (

                                <li
                                    key={key}
                                    className={activeLeft.name === element.name ? 'active' : null}
                                    onClick={() => { setActiveLeft(element), setLeft(false) }}
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

            <div className={`${isLeft ? 'left-nav-respo' : ' left-nav-respo-hidden'}`}>

                <div className="close-icon-container-left-nav" onClick={() => { setLeft(false) }}>
                    <CloseIconMedium />
                </div>


                <div className="company-logo-container" >
                    <div className="logo-box">

                        <img src={logo2} alt="" />

                    </div>
                </div>

                <ul className='sidenav-ul'>

                    {
                        leftMenus.map((element, key) => {
                            return (

                                <li
                                    key={key}
                                    className={activeLeft.name === element.name ? 'active' : null}
                                    onClick={() => { setActiveLeft(element), setLeft(false) }}
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

            <div className={`right-content`}>
                <div className="content-header">
                    <span className='content-tittle' onClick={() => { setLeft(!isLeft) }}>
                        <div className="nav-controller">
                            <OptionsIcon />
                        </div> {activeLeft.name}
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
