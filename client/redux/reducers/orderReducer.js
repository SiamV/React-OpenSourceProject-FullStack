import * as axios from "axios";

let defaultState = {
    orders: [],
    updateMode: false,
    deleteStatus: false,
    saveStatus: false,
    saveAndAddStatus: false,
    updateStatus: false,
    date: '',
    tourName: 'Выберите тур',
    operator: 'Выберите компанию',
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
    contact: '...',
    pickUpTime: '',
    guide: '',
    note: ''
}

const SET_ORDERS = 'orderReducer/SET_ORDERS'
const WRITE_FIELDS = 'orderReducer/WRITE_FIELDS'
const SET_CLIENT_CARD = 'orderReducer/SET_CLIENT_CARD'
const SET_UPDATE_MODE = 'orderReducer/SET_UPDATE_MODE'
const CLEAN_FIELD_FOR_NEW_ORDER = 'orderReducer/CLEAN_FIELD_FOR_NEW_ORDER'
const SET_DELETE_STATUS = 'orderReducer/SET_DELETE_STATUS'
const SET_SAVE_STATUS = 'orderReducer/SET_SAVE_STATUS'
const SET_SAVE_AND_ADD_STATUS = 'orderReducer/SET_SAVE_AND_ADD_STATUS'
const SET_UPDATE_STATUS = 'orderReducer/SET_UPDATE_STATUS'
const SET_FIELD_FOR_ADD_MORE_ORDER = 'orderReducer/SET_FIELD_FOR_ADD_MORE_ORDER'

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
        case CLEAN_FIELD_FOR_NEW_ORDER: {
            return {
                ...state,
                updateMode: false,
                deleteStatus: false,
                saveStatus: false,
                updateStatus: false,
                saveAndAddStatus: false,
                date: action.currentDate,
                tourName: 'Выберите тур',
                operator: 'Выберите компанию',
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
                contact: '...',
                pickUpTime: '',
                guide: '',
                note: ''
            }
        }
        case SET_FIELD_FOR_ADD_MORE_ORDER: {
            return {
                ...state,
                updateMode: false,
                deleteStatus: false,
                saveStatus: false,
                saveAndAddStatus: false,
                updateStatus: false,
                date: '',
                tourName: 'Выберите тур',
                operator: 'Выберите компанию',
                name: action.currentState.name,
                hotel: action.currentState.hotel,
                roomNumber: action.currentState.roomNumber,
                adult: action.currentState.adult,
                child: action.currentState.child,
                infant: action.currentState.infant,
                adultPrice: 0,
                childPrice: 0,
                infantPrice: 0,
                commission: 0,
                contact: action.currentState.contact,
                pickUpTime: '',
                guide: '',
                note: ''
            }
        }
        case SET_DELETE_STATUS: {
            return {
                ...state,
                deleteStatus: action.status
            }
        }
        case SET_SAVE_STATUS: {
            return {
                ...state,
                saveStatus: action.status
            }
        }
        case SET_SAVE_AND_ADD_STATUS: {
            return {
                ...state,
                saveAndAddStatus: action.status
            }
        }
        case SET_UPDATE_STATUS: {
            return {
                ...state,
                updateStatus: action.status
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

export const writeFieldAC = (value, idField) => ({type: WRITE_FIELDS, value, idField})

export const setUpdateMode = (updateMode) => ({type: SET_UPDATE_MODE, updateMode})
export const setDeleteStatus = (status) => ({type: SET_DELETE_STATUS, status})
export const setSaveStatus = (status) => ({type: SET_SAVE_STATUS, status})
export const setSaveAndAddStatus = (status) => ({type: SET_SAVE_AND_ADD_STATUS, status})
export const setUpdateStatus = (status) => ({type: SET_UPDATE_STATUS, status})


export const cleanFieldsForNewOrder = (currentDate) => ({type: CLEAN_FIELD_FOR_NEW_ORDER, currentDate})
export const setFieldForAddMoreOrder = (currentState) => ({type: SET_FIELD_FOR_ADD_MORE_ORDER, currentState})

export const saveOrderThunkCreator = (state, idButton) => async (dispatch) => {
    try {
        let response = await axios.post(`/api/v1/add/order`, {
            date: state.date,
            tourName: state.tourName,
            operator: state.operator,
            name: state.name,
            hotel: state.hotel,
            roomNumber: state.roomNumber,
            adult: state.adult,
            child: state.child,
            infant: state.infant,
            adultPrice: state.adultPrice,
            childPrice: state.childPrice,
            infantPrice: state.infantPrice,
            commission: state.commission,
            contact: state.contact,
            pickUpTime: state.pickUpTime,
            guide: state.guide,
            note: state.note
        })
        if (response.status === 200) {
            (idButton === 'save') ?
                dispatch(setSaveStatus(true)) :
                dispatch(setSaveAndAddStatus(true))
        }
    } catch (e) {
    }
}

export const updateOrderInDBThunkCreator = (state, idOrder) => async (dispatch) => {
    try {
        let response = await axios.put(`/api/v1/update/order`, {
            _id: idOrder,
            date: state.date,
            tourName: state.tourName,
            operator: state.operator,
            name: state.name,
            hotel: state.hotel,
            roomNumber: state.roomNumber,
            adult: state.adult,
            child: state.child,
            infant: state.infant,
            adultPrice: state.adultPrice,
            childPrice: state.childPrice,
            infantPrice: state.infantPrice,
            commission: state.commission,
            contact: state.contact,
            pickUpTime: state.pickUpTime,
            guide: state.guide,
            note: state.note
        })
        if (response.status === 200) {
            dispatch(setUpdateStatus(true))
        }
    } catch (e) {
    }
}

export const deleteOrderThunkCreator = (id) => async (dispatch) => {
    try {
        let response = await axios.delete(`/api/v1/delete/order/${id}`)
        if (response.status === 200) {
            dispatch(setDeleteStatus(true))
        }
    } catch (e) {
    }
}

export default orderReducer
