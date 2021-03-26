import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrdersThunkCreator, setUpdateMode} from "../../redux/reducers/orderReducer";
import {NavLink} from "react-router-dom";
import classes from '../Tours/tours.module.css'

const TourOrders = () => {
    useEffect(() => {
        dispatch(setOrdersThunkCreator())
    }, [])

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders)
    return (
        <div className={classes.toursPageWrapper}>
            <button onClick={() => {
                dispatch(setUpdateMode(false))
            }}><NavLink to={'/admin/create-tour-order'}>add order</NavLink>
            </button>
            {/*sort doesn't work*/}
            {orders.sort((a,b) => a.date < b.date ? 1 : -1).map((client) => (
                    <div key={client._id} className={classes.tourWrapper}>
                        <NavLink className={classes.navLinkH2} to={`/admin/tour-order/${client._id}`}>
                            <div className={classes.previewBlockWrapper}>
                                <div className={classes.previewBlock}>Дата: {new Date(client.date).toUTCString().slice(5,16)}</div>
                                <div className={classes.previewBlock}>Тур: {client.tourName}</div>
                                <div className={classes.previewBlock}>Имя: {client.name}</div>
                            </div>
                        </NavLink>
                    </div>
                )
            )
            }
        </div>
    )
}

export default TourOrders