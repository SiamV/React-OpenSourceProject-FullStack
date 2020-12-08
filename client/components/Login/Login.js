import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setLoginFieldAC, setPasswordFieldAC, signInThunkCreator} from '../../redux/reducers/loginReducer'
import classes from './Login.module.css'


const Login = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.login.email);
    const password = useSelector(state => state.login.password);
    const isErr = useSelector(state => state.login.isErr);

    return (
        <div className={classes.loginWrapper}>
            <div className={classes.loginWrapper2}>
                <form className={classes.loginFormWrapper}>
                    <div className={classes.loginFieldWrapper}>
                        <label htmlFor="username">
                            Login
                        </label>
                        <input className={classes.loginFieldInput}
                               id="login"
                               type="text"
                               placeholder="login/email"
                               value={email}
                               onChange={(e) => {
                                   dispatch(setLoginFieldAC(e.target.value))
                               }} />
                    </div>
                    <div className={classes.passwordFieldWrapper}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input className={classes.passwordFieldInput}
                               id="password"
                               type="password"
                               placeholder="******************"
                               value={password}
                               onChange={(e) => {
                                   dispatch(setPasswordFieldAC(e.target.value))
                               }} />
                        {(isErr === 'error authentication') && <p>Login or password is not correct</p>}
                    </div>
                    <div className={classes.buttonFieldWrapper}>
                        <button type="button"
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