import * as axios from "axios";
import {setStatusUpdate} from "./textEditorReducer";

let defaultState = {
    tours: [],
    isLoading: false,
    pageLink: '',
    tourTitle: '',
    tourContent: '{"blocks":[{"key":"20dqs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category: 'news',
    seoTitle: '',
    seoDescription: '',
    sendStatusOk: false,
    sendDeleteStatusOk: false
}

const SET_TOURS = 'toursReducer/SET_TOURS'
const WRITE_TOUR_TITLE = 'toursReducer/WRITE_TOUR_TITLE'
const WRITE_TOUR_CONTENT = 'toursReducer/WRITE_TOUR_CONTENT'
const WRITE_TOUR_CATEGORY = 'toursReducer/WRITE_TOUR_CATEGORY'
const WRITE_SEO_TITLE = 'toursReducer/WRITE_SEO_TITLE'
const WRITE_SEO_DESCRIPTION = 'toursReducer/WRITE_SEO_DESCRIPTION'
const WRITE_PAGE_LINK = 'toursReducer/WRITE_PAGE_LINK'
const IS_LOADING = 'toursReducer/IS_LOADING'
const SEND_STATUS_TOUR_OK = 'toursReducer/SEND_STATUS_TOUR_OK'
const DELETE_INFO_WINDOW = 'toursReducer/DELETE_INFO_WINDOW'
const SEND_DELETE_STATUS_TOUR_OK = 'toursReducer/SEND_DELETE_STATUS_TOUR_OK'
const SET_DEFAULT_DATA_FOR_UPDATE = 'toursReducer/SET_DEFAULT_DATA_FOR_UPDATE'
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
        case WRITE_TOUR_CONTENT: {
            return {
                ...state,
                tourContent: action.textContent
            }
        }
        case WRITE_TOUR_CATEGORY: {
            return {
                ...state,
                category: action.textCategory
            }
        }
        case WRITE_SEO_TITLE: {
            return {
                ...state,
                seoTitle: action.seoTitle
            }
        }
        case WRITE_SEO_DESCRIPTION: {
            return {
                ...state,
                seoDescription: action.seoDescription
            }
        }
        case WRITE_PAGE_LINK: {
            return {
                ...state,
                pageLink: action.pageLink
            }
        }
        case SEND_STATUS_TOUR_OK: {
            return {
                ...state,
                tourTitle: '',
                tourContent: '',
                sendStatusOk: action.statusOk
            }
        }
        case SEND_DELETE_STATUS_TOUR_OK: {
            return {
                ...state,
                sendDeleteStatusOk: action.statusOk
            }
        }
        case DELETE_INFO_WINDOW: {
            return {
                ...state,
                sendStatusOk: false,
                sendDeleteStatusOk: false
            }
        }
        case SET_DEFAULT_DATA_FOR_UPDATE: {
            return {
                ...state,
                pageLink: action.pageLink,
                tourTitle: action.tourTitle,
                tourContent: action.tourContent,
                category: action.category,
                seoTitle: action.seoTitle,
                seoDescription: action.seoDescription
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

export const writeTourContentAC = (textContent) => ({
    type: WRITE_TOUR_CONTENT,
    textContent
})

export const writeTourCategoryAC = (textCategory) => ({
    type: WRITE_TOUR_CATEGORY,
    textCategory
})

export const writeSeoTitle = (seoTitle) => ({
    type: WRITE_SEO_TITLE,
    seoTitle
})

export const writeSeoDescription = (seoDescription) => ({
    type: WRITE_SEO_DESCRIPTION,
    seoDescription
})

export const writePageLink = (pageLink) => ({
    type: WRITE_PAGE_LINK,
    pageLink
})

export const SendTourStatusOkAC = (statusOk) => ({
    type: SEND_STATUS_TOUR_OK, statusOk
})

export const SendDeleteStatusOkAC = (statusOk) => ({
    type: SEND_DELETE_STATUS_TOUR_OK, statusOk
})

export const deleteInfoAC = () => ({
    type: DELETE_INFO_WINDOW
})

export const sendTourToDBThunkCreator = (tourTitle,
                                         tourContent,
                                         category,
                                         seoTitle,
                                         seoDescription,
                                         pageLink
) => async (dispatch) => {
    try {
        let response = await axios.post(`/api/v1/add/tours`, {
            pageLink: pageLink,
            tourTitle: tourTitle,
            tour: tourContent,
            category: category,
            seoTitle: seoTitle,
            seoDescription: seoDescription
        })
        if (response.status === 200) {
            dispatch(SendTourStatusOkAC(true))
        }
    } catch (e) {
    }
}

export const getTourInfoThunkCreator = (pageLink) => async (dispatch) => {
    try {
        let response = await axios.get(`/api/v1/tours/${pageLink}`)
        if (response.status === 200) {
            dispatch(setStatusUpdate(false)) //убрать когда напишем логику кнопки update вместо create
            dispatch({
                type: SET_DEFAULT_DATA_FOR_UPDATE,
                pageLink: response.data.pageLink,
                tourTitle: response.data.tourTitle,
                tourContent: response.data.tour,
                category: response.data.category,
                seoTitle: response.data.seoTitle,
                seoDescription: response.data.seoDescription
            })
            dispatch(setStatusUpdate(true))
        }
    } catch (e) {
    }
}

export const updateTourInDBThunkCreator = (pageLink,
                                           tourTitle,
                                           tourContent,
                                           category,
                                           seoTitle,
                                           seoDescription
) => async (dispatch) => {
    try {
        let response = await axios.put(`/api/v1/update/tours`, {
            pageLink: pageLink,
            tourTitle: tourTitle,
            tour: tourContent,
            category: category,
            seoTitle: seoTitle,
            seoDescription: seoDescription
        })
        if (response.status === 200) {
            dispatch(setStatusUpdate(false))
        }
    } catch (e) {
    }
}

export const deleteTourThunkCreator = (pageLink) => async (dispatch) => {
    try {
        let response = await axios.delete(`/api/v1/delete/tours/${pageLink}`)
        if (response.status === 200) {
            dispatch(SendDeleteStatusOkAC(true))
        }
    } catch (e) {
    }
}

export default toursReducer;