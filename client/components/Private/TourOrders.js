import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrdersThunkCreator, setUpdateMode} from "../../redux/reducers/orderReducer";
import {NavLink} from "react-router-dom";
import classes from './tourOrder.module.css';
import classes2 from '../Tours/tours.module.css';
import classes3 from './createTours.module.css'

const TourOrders = () => {
    useEffect(() => {
        dispatch(setOrdersThunkCreator())
    }, [])

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders)
    return (
        <div className={classes.ordersMainWrapper}>
            <NavLink className={classes2.navLinkH2} to={'/admin/create-tour-order'}>
                <button className={classes.addButton} onClick={() => {
                    dispatch(setUpdateMode(false))
                }}>new order
                </button>
            </NavLink>

            {orders.sort((a, b) => a.date < b.date ? 1 : -1).map((client) => (
                    <div key={client._id} className={classes2.tourWrapper}>
                        <div className={classes.ordersWrapper}>
                            <div className={classes.blockWrapper}>
                                <div className={classes.dateBlock}>
                                    {new Date(client.date).toUTCString().slice(5, 16)}
                                </div>
                                <div>
                                    {client.tourName}
                                </div>
                                <div>
                                    {client.hotel}
                                </div>
                                <div>
                                    {client.name}
                                </div>
                            </div>
                            <div className={classes.blockWrapper}>
                                <div>
                                    {client.adult}/{client.child}/{client.infant}
                                </div>
                                <div>
                                    {client.pickUpTime}
                                </div>
                                <div>
                                    {client.guide}
                                </div>
                                <div className={classes.commissionBlock}>
                                    {client.commission}
                                </div>
                            </div>
                        </div>
                        <NavLink className={classes2.navLinkH2} to={`/admin/tour-order/${client._id}`}>more...</NavLink>
                    </div>
                )
            )
            }
        </div>
    )
}

export default TourOrders