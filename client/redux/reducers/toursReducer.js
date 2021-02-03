import * as axios from "axios";

let defaultState = {
    tours: [],
    isLoading: false,
    tourTitle: '',
    sendStatusOk: false,
    imagesUrls: ['https://bronntravel.com.ua/wp-content/uploads/2017/11/hram-el-hazne-375x300.jpg',
                'https://bronntravel.com.ua/wp-content/uploads/2017/11/0005582_culturehistoryotherrecreation-and-leisure-img_0833-tower-of-david_493-400x267.jpeg',
                'https://bronntravel.com.ua/wp-content/uploads/2017/11/sudm4dx-cairo-egypt-400x255.jpg']
}

const SET_TOURS = 'toursReducer/SET_TOURS'
const WRITE_TOUR_TITLE = 'toursReducer/WRITE_TOUR_TITLE'
const IS_LOADING = 'toursReducer/IS_LOADING'
const SEND_STATUS_TOUR_OK = 'toursReducer/SEND_STATUS_TOUR_OK'
const DELETE_INFO_WINDOW = 'toursReducer/DELETE_INFO_WINDOW'
const GET_SRC_SERVER = 'toursReducer/GET_SRC_SERVER'

const toursReducer = (state = defaultState, action) => {
    switch (action.type) {
        case IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_TOURS: {
            return {
                ...state,
                tours: action.tours
            }
        }
        case WRITE_TOUR_TITLE: {
            return {
                ...state,
                tourTitle: action.textTitle
            }
        }
        case SEND_STATUS_TOUR_OK: {
            return {
                ...state,
                tourTitle: '',
                tourText: '',
                sendStatusOk: action.statusOk
            }
        }
        case DELETE_INFO_WINDOW: {
            return {
                ...state,
                sendStatusOk: false
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

export const isLoadingAC = (isLoading) => {
    return {type: IS_LOADING, isLoading: isLoading}
}

export const setToursThunkCreator = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/tours')
        dispatch({type: SET_TOURS, tours: response.data})
        dispatch(isLoadingAC(true))
    } catch (e) {

    }
}

export const writeTourTitleAC = (textTitle) => ({
    type: WRITE_TOUR_TITLE,
    textTitle
})

export const SendTourStatusOkAC = (statusOk) => ({
    type: SEND_STATUS_TOUR_OK, statusOk
})

export const deleteInfoAC = () => ({
    type: DELETE_INFO_WINDOW
})

export const sendTextTourThunkCreator = (tourTitle, tourText) => async (dispatch) => {
    try {
        let response = await axios.post(`/api/v1/add/tours`, {tourTitle: tourTitle, tour: tourText})
        if (response.status === 200) {
            dispatch(SendTourStatusOkAC(true))
        }
    } catch (e) {
    }
}

export const savePhotoThC = (file) => async (dispatch) => {
    const formData = new FormData();
    formData.append('image', file)
    try {
        let response = await axios.post(`/api/v1/add/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

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

export default toursReducer;