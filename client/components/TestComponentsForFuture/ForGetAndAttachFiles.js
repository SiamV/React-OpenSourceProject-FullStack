import React from 'react'
import * as axios from "axios";

const ForGEtAndAttachFiles = () => {

    const toGetFiles = async () => {
        try {
            let response = await axios.get('/api/v1/get/src/image')
            console.log(response.data)
        } catch (error) {
            console.log('Error:', error.response.status);
        }
    }

    return (
        <div>
            <h3>Get files from server folder</h3>
            <button onClick={toGetFiles}>Check</button>
            <p>Choose file from library</p>
            <input id={'attach_img'}
                   type={'file'}
                   onChange={(e) => {

                   }}
            />
        </div>
    )
}

export default ForGEtAndAttachFiles