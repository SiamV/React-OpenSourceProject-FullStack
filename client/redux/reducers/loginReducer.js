import * as axios from "axios";
import Cookies from 'universal-cookie';

const cookie = new Cookies()
let defaultState = {
    email: '',
    password: '',
    token: cookie.get('token'), //if have cookie use token from them
    user: {},
    isAuth: false,
    isErr: ''
}

const UPDATE_EMAIL = 'loginReducer/UPDATE_EMAIL';
const UPDATE_PASSWORD = 'loginReducer/UPDATE_PASSWORD';
const CREATE_TOKEN = 'loginReducer/CREATE_TOKEN';
const LOGOUT = 'loginReducer/LOGOUT';
const IS_ERR = 'loginReducer/IS_ERR';

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL: {
            return {
                ...state,
                email: action.email
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                password: action.password
            }
        }
        case CREATE_TOKEN: {
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuth: true,
                password: ''
            }
        }
        case LOGOUT: {
            cookie.remove('token')
            return {
                ...state,
                email: '',
                password: '',
                token: '',
                user: {},
                isAuth: false,
                isErr: ''
            }
        }
        case IS_ERR: {
            return {
                ...state,
                isErr: action.status,
            }
        }

        default:
            return state;
    }
}

export const setLoginFieldAC = (email) => ({
    type: UPDATE_EMAIL,
    email
})

export const setPasswordFieldAC = (password) => ({
    type: UPDATE_PASSWORD,
    password
})

export const isErrAC = (status) => ({
    type: IS_ERR,
    status
})

export const signInThunkCreator = (email, password) => async (dispatch) => {
    try {
        let response = await axios.post('/api/v1/auth/user', { email, password }, {
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.data.token) {
            dispatch({ type: CREATE_TOKEN, token: response.data.token, user: response.data.user })
        } else {dispatch(isErrAC(response.data.status))}
    } catch (e) {

    }
}

export const AuthorizationThunkCreator = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/authorization')
        if (response.data.token) {
            dispatch({ type: CREATE_TOKEN, token: response.data.token })
        }
    } catch (e) {

    }
}

export const logOutAC = () => ({ type: LOGOUT })

export const SecretRoute = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/admin')
    } catch (e) {

    }
}

export default loginReducer;