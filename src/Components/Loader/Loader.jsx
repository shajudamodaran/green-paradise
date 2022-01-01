import React from 'react'
import { useSelector } from 'react-redux'
import { PuffLoader } from 'react-spinners'
import './loader.css'

function Loader() {

    let { status,message } = useSelector((state) => state.loader.loader)

    console.log( status,message);


    return (
        <React.Fragment>
            {
                status ?

                    <div className='loader-container'>

                        <div className="loader-body">
                            <PuffLoader color={"#005DFF"} loading={true} size={70} />

                            <span className='loading-tittle'>{message}</span>
                        </div>

                    </div>

                    : null
            }
        </React.Fragment>
    )
}

export default Loader
