import * as axios from "axios";
import {isLoadingAC} from "./toursReducer";

let defaultState = {
    orders: []
}

const SET_ORDERS = 'toursReducer/SET_ORDERS'

const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }
        default:
            return state;
    }
}

export const setOrdersThunkCreator = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/order')
        dispatch({type: SET_ORDERS, orders: response.data})
        // dispatch(isLoadingAC(true))
    } catch (e) {

    }
}

export default  orderReducer
