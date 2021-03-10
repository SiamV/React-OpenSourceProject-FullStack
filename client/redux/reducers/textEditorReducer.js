import * as axios from "axios";
import {SendTourStatusOkAC} from "./toursReducer";

let defaultState = {
    statusUpload: false,
    imagesUrls: []
}

const SEND_STATUS_PHOTO_OK = 'textEditorReducer/SEND_STATUS_PHOTO_OK'
const GET_SRC_SERVER = 'textEditorReducer/GET_SRC_SERVER'

const textEditorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SEND_STATUS_PHOTO_OK: {
            return {
                ...state,
                statusUpload: action.statusOk
            }
        }
        case GET_SRC_SERVER: {
            return {
                ...state,
                imagesUrls: action.imagesUrls
            }
        }
        default:
            return state;
    }
}
export const SendPhotoStatusTrueAC = (statusOk) => ({
    type: SEND_STATUS_PHOTO_OK, statusOk
})

export const SendPhotoStatusChangeToFalse = () => ({
    type: SEND_STATUS_PHOTO_OK, statusOk:false
})

export const savePhotoThC = (file) => async (dispatch) => {
    const formData = new FormData();
    formData.append('image', file)
    try {
        let response = await axios.post(`/api/v1/add/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 200) {
            dispatch(SendPhotoStatusTrueAC(true))
        }

    } catch (e) {
    }
}

//ac and thunk:
export const saveUrlsToStateAC = (imagesUrls) => ({
    type: GET_SRC_SERVER, imagesUrls: imagesUrls
})
export const getSrcImageFromServer = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/get/src/image')
        console.log(response.data)
        if (response.data){
            dispatch({type: GET_SRC_SERVER, imagesUrls: response.data})
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

export default textEditorReducer;