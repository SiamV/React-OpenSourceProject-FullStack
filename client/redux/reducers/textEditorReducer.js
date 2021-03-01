import * as axios from "axios";
import {SendTourStatusOkAC} from "./toursReducer";

let defaultState = {
    statusUpload: false,
    imagesUrls: ['https://bronntravel.com.ua/wp-content/uploads/2017/11/hram-el-hazne-375x300.jpg',
        'https://bronntravel.com.ua/wp-content/uploads/2017/11/0005582_culturehistoryotherrecreation-and-leisure-img_0833-tower-of-david_493-400x267.jpeg',
        'https://bronntravel.com.ua/wp-content/uploads/2017/11/sudm4dx-cairo-egypt-400x255.jpg']
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

export const getSrcImageFromServer = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/get/src/image')
        dispatch({type: GET_SRC_SERVER, imagesUrls: response.data})
    } catch (e) {
    }
}

export default textEditorReducer;