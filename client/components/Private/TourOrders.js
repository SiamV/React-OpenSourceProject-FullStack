import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setClientCard, setOrdersThunkCreator, setUpdateMode} from "../../redux/reducers/orderReducer";
import {NavLink} from "react-router-dom";

const TourOrders = () => {
    useEffect(() => {
        dispatch(setOrdersThunkCreator())
    }, [])

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders)

    return (
        <div>
            <button onClick={() => {
                dispatch(setUpdateMode(false))
            }}><NavLink to={'/admin/create-tour-order'}>add order</NavLink>
            </button>
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