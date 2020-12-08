import * as axios from "axios";

let defaultState = {
    tours: [],
    tourText: '',
    isLoading: false
}

const SET_TOURS = 'toursReducer/SET_TOURS'
const WRITE_TOUR = 'toursReducer/WRITE_TOUR'
const IS_LOADING = 'toursReducer/IS_LOADING'

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
        case WRITE_TOUR: {
            return {
                ...state,
                tourText: action.text
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

export const writeTextTourAC = (text) => ({
    type: WRITE_TOUR,
    text
})

export const sendTextTourThunkCreator = (text) => async (dispatch) => {
    try {
        let response = await axios.post(`/api/v1/add/tours`, {tour: text})
    } catch (e) {
    }
}

export default toursReducer;