import React from 'react'
import * as axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getSrcImageFromServer, saveUrlsToStateAC} from "../../redux/reducers/textEditorReducer";

const ForGEtAndAttachFiles = () => {
    const dispatch = useDispatch();

    const toGetFiles = async () => {
        try {
            let response = await axios.get('/api/v1/get/src/image')
            console.log(response.data)
            // return response.data
            dispatch(saveUrlsToStateAC(response.data))
        } catch (error) {
            console.log('Error:', error.response.status);
        }
    }

    return (
        <div>
            <h3>Get files from server folder</h3>
            <button onClick={() => {{toGetFiles()}}}>Check</button>
            <p>Choose file from library</p>

            <input id={'attach_img'}
                   type={'file'}
                   multiple
                   onChange={(e) => {
                       console.log('this photo need upload to attach to textEditor draft. Call onAddImage(src)')
                   }}
            />
        </div>
    )
}

export default ForGEtAndAttachFiles