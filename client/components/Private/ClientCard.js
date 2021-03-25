import React from 'react';
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom'
import {writeTourCategoryAC} from "../../redux/reducers/toursReducer";

const ClientCard = () => {
    const {idOrder} = useParams();
    const orders = useSelector(state => state.orders.orders)
    const client = orders.filter(o => o._id === idOrder)[0]
    return (
        <div>
            {(client) &&
            <form onSubmit={(event) => {
            }}>
                <div>Дата: <input type="text" value={client.date} onChange={() => {}} /></div>
                <div>Тур: <input type="text" value={client.tourName} onChange={() => {}} /></div>
                <div>
                    <select value={client.operator} onChange={()=>{
                        // dispatch(writeTourCategoryAC(e.target.value))
                    }}>
                        <option value="icTour">icTour</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div>Имя клиента: {client.name}</div>
                <div>Отель: {client.hotel}</div>
                <div>Номер комнаты: {client.roomNumber}</div>
                <div>Взрослые: {client.adult} цена: {client.adultPrice} </div>
                <div>Дети: {client.child} цена: {client.childPrice}</div>
                <div>Инфанты: {client.infant} цена: {client.infantPrice}</div>
                <div>Комиссия: {client.commission}</div>
                <div>Контакт: {client.contact}</div>
                <div>Время пикапа: {client.pickUpTime}</div>
                <div>Гид: {client.guide}</div>
                <div>Примечание: {client.note}</div>

                {/*<input type="submit" value="Отправить" />*/}
            </form>
            }
            <button>update/delete</button>
            <button>save</button>
        </div>
    )
}

export default ClientCard