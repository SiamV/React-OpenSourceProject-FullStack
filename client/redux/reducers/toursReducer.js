import * as axios from "axios";

let defaultState = {
    tours: []
}

const SET_TOURS = 'toursReducer/SET_TOURS'

const toursReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TOURS: {
            return {
                ...state,
                tours: action.tours
            }
        }
        default:
            return state;
    }
}

export const setToursThunkCreator = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/tours')
        console.log(response)
        dispatch({type: SET_TOURS, tours: response.data})
    } catch (e) {

    }
}

export default toursReducer;