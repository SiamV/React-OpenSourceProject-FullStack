import * as axios from "axios";

let defaultState = {
    orders: [],
    updateMode: false,
    date: '',
    tourName: '',
    operator: '',
    name: '',
    hotel: '',
    roomNumber: 0,
    adult: 0,
    child: 0,
    infant: 0,
    adultPrice: 0,
    childPrice: 0,
    infantPrice: 0,
    commission: 0,
    contact: '',
    pickUpTime: '',
    guide: '',
    note: ''
}

const SET_ORDERS = 'toursReducer/SET_ORDERS'
const WRITE_FIELDS = 'toursReducer/WRITE_FIELDS'
const SET_CLIENT_CARD = 'toursReducer/SET_CLIENT_CARD'
const SET_UPDATE_MODE = 'toursReducer/SET_UPDATE_MODE'

const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }
        case SET_CLIENT_CARD: {
            return {
                ...state,
                date: action.date,
                tourName: action.tourName,
                operator: action.operator,
                name: action.name,
                hotel: action.hotel,
                roomNumber: action.roomNumber,
                adult: action.adult,
                child: action.child,
                infant: action.infant,
                adultPrice: action.adultPrice,
                childPrice: action.childPrice,
                infantPrice: action.infantPrice,
                commission: action.commission,
                contact: action.contact,
                pickUpTime: action.pickUpTime,
                guide: action.guide,
                note: action.note
            }
        }
        case WRITE_FIELDS: {
            return {
                ...state,
                [action.idField]: action.value
            }
        }
        case SET_UPDATE_MODE: {
            return {
                ...state,
                updateMode: action.updateMode
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

export const setClientCard = (clientObj) => (
    {
        type: SET_CLIENT_CARD,
        date: clientObj.date,
        tourName: clientObj.tourName,
        operator: clientObj.operator,
        name: clientObj.name,
        hotel: clientObj.hotel,
        roomNumber: clientObj.roomNumber,
        adult: clientObj.adult,
        child: clientObj.child,
        infant: clientObj.infant,
        adultPrice: clientObj.adultPrice,
        childPrice: clientObj.childPrice,
        infantPrice: clientObj.infantPrice,
        commission: clientObj.commission,
        contact: clientObj.contact,
        pickUpTime: clientObj.pickUpTime,
        guide: clientObj.guide,
        note: clientObj.note
    }
)

export const writeFieldAC = (value, idField) => (
    {type: WRITE_FIELDS, value, idField}
)

export const setUpdateMode = (updateMode) => (
    {type: SET_UPDATE_MODE, updateMode}
)

export default orderReducer
