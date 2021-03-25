import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrdersThunkCreator} from "../../redux/reducers/orderReducer";
import {NavLink} from "react-router-dom";

const TourOrders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders)
    useEffect(() => {
        dispatch(setOrdersThunkCreator())
    }, [])

    return (
        <div>
            <button>add order</button>
            {orders.map((client) => (
                    <div key={client._id}>
                        <NavLink to={`/admin/tour-order/${client._id}`}>
                            <div>
                                <div>Дата: {client.date}</div>
                                <div>Тур: {client.tourName}</div>
                                <div>Имя: {client.name}</div>
                            </div>
                        </NavLink>
                    </div>
                )
            )}
        </div>
    )
}

export default TourOrders