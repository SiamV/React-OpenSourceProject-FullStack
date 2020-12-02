import React, { useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';

import store from "../redux/store";
import './App.css'
import MainMenu from './MainMenu/MainMenu';
import Login from './Login/Login';
import MainPage from './MainPage/MainPage';
import Articles from './Articles/Articles';
import Tours from './Tours/Tours';
import Header from './Header/Header';
import Account from './Account/Account';
import Footer from './Footer/Footer';
import PrivateComponent from './Private/PriviteComponent';
import { AuthorizationThunkCreator, SecretRoute } from '../redux/reducers/loginReducer';

//main structure project. Grid css
const AppContainer = () => {
  const isAuth = useSelector(s => s.login.isAuth)
  const token = useSelector(s => s.login.token)
  const dispatch = useDispatch()

  // start app
  useEffect(() => {
    if (token) {
      dispatch(AuthorizationThunkCreator())
      dispatch(SecretRoute())
    }
  }, [])

  return (
    <div className={'site-wrapper'}>
      <div className={'site-wrapper-header'}>
        <Header />
      </div>
      <div className={'site-wrapper-nav '}>
        <MainMenu />
      </div>
      <div className={'site-wrapper-account '}>
        <Account />
      </div>
      <div className={'site-wrapper-feed'}>
        {!isAuth && <Route path={'/login'} render={() => <Login />} />}
        <Route path={'/articles'} render={() => <Articles />} />
        <Route path={'/tours'} render={() => <Tours />} />
        <Route exact path={'/'} render={() => <MainPage />} />
        <Route exact path={'/admin'} render={() => <PrivateComponent />} />
      </div>
      <div className={'site-wrapper-footer'}>
        <Footer />
      </div>
    </div >
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}
export default App;