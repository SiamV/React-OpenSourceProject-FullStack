import React, {useEffect} from 'react';
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import {Provider} from "react-redux";
import {useSelector, useDispatch} from 'react-redux';

import store from "../redux/store";
import './App.css'
import MainMenu from './MainMenu/MainMenu';
import Login from './Login/Login';
import Posts from './Posts/Posts';
import Articles from './Articles/Articles';
import Tours from './Tours/Tours';
import Header from './Header/Header';
import Account from './Account/Account';
import Footer from './Footer/Footer';
import {AuthorizationThunkCreator, SecretRoute} from '../redux/reducers/loginReducer';
import CreateTours from "./Private/CreateTours";
import PageTour from "./Tours/PageTour";
import DownloadFileFromServer from "./TestComponentsForFuture/DownloadFileFromServer";
import ForGEtAndAttachFiles from "./TestComponentsForFuture/ForGetAndAttachFiles";
import AdminRouter from "./Private/AdminRouter";
import TourOrders from "./Private/TourOrders";
import ClientCard from "./Private/ClientCard";
import ReportForPeriod from "./Private/ReportForPeriod";

//main structure project. Grid css
const AppContainer = () => {
    const isAuth = useSelector(s => s.login.isAuth)
    const token = useSelector(s => s.login.token)
    const dispatch = useDispatch()
    const history = useHistory();

    // start app
    useEffect(() => {
        if (token) {
            dispatch(AuthorizationThunkCreator())
            dispatch(SecretRoute())
        }
    }, [])

    //redirect to /admin if passed login
    useEffect(() => {
        if (isAuth) {
            history.push('/admin')
        }
    }, [isAuth])

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
                <Route path={'/news-egypt'} render={() => <Posts categoryPost={'news'}/>} />
                {/*<Route path={'/news-egypt'} render={() => <ForGEtAndAttachFiles />} />*/}
                <Route path={'/tours'} render={() => <Tours tourCategory={'tour'}/>} />
                <Route path={'/tour/:pageLink'} render={() => <PageTour />} />
                <Route exact path={'/'} render={() => <Posts categoryPost={'main'}/>} />
                {isAuth && <Route exact path={'/admin'} render={() => <AdminRouter />} />}
                {isAuth && <Route exact path={'/admin/my-editor'} render={() => <CreateTours />} />}
                {isAuth && <Route exact path={'/admin/tour-order'} render={() => <TourOrders />} />}
                {isAuth && <Route exact path={'/admin/tour-order/:idOrder'} render={() => <ClientCard />} />}
                {isAuth && <Route exact path={'/admin/create-tour-order'} render={() => <ClientCard />} />}
                {isAuth && <Route exact path={'/admin/report'} render={() => <ReportForPeriod />} />}
            </div>
            <div className={'site-wrapper-footer'}>
                <Footer />
            </div>
        </div>
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