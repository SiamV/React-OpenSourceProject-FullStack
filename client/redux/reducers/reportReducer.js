let defaultState = {
    fromDate: '',
    toDate: '',
    filteredOrders: []
}

const SET_FROM_DATE = 'reportReducer/SET_FROM_DATE'
const SET_TO_DATE = 'reportReducer/SET_TO_DATE'
const GET_FILTERED_ORDERS = 'reportReducer/GET_FILTERED_ORDERS'

const reportReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FROM_DATE: {
            return {
                ...state,
                fromDate: action.fromDate
            }
        }
        case SET_TO_DATE: {
            return {
                ...state,
                toDate: action.toDate
            }
        }
        case GET_FILTERED_ORDERS: {
            return {
                ...state,
                filteredOrders: action.filteredOrders
            }
        }

        default:
            return state;
    }
}

export const setFromDateAC = (fromDate) => ({type:SET_FROM_DATE, fromDate})
export const setToDateAC = (toDate) => ({type:SET_TO_DATE, toDate})
export const getFilteredOrders = (filteredOrders) => ({type:GET_FILTERED_ORDERS, filteredOrders})

export default reportReducer

