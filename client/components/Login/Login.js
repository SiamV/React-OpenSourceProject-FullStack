import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../stylesTailwind/main.css';
import { setLoginFieldAC, setPasswordFieldAC, signInThunkCreator } from '../../redux/reducers/loginReducer'

const Login = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.login.email);
    const password = useSelector(state => state.login.password);
    return (
        <div className="flex justify-center items-center ">
            <div className="w-full max-w-xs ">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Login
                    </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="login"
                            type="text"
                            placeholder="login/email"
                            value={email}
                            onChange={(e) => {
                                dispatch(setLoginFieldAC(e.target.value))
                            }} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => {
                                dispatch(setPasswordFieldAC(e.target.value))
                            }} />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                                dispatch(signInThunkCreator(email, password))
                            }}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;