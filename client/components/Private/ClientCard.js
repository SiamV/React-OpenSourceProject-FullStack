import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom'

import {
    deleteOrderThunkCreator,
    saveOrderThunkCreator,
    setClientCard,
    setUpdateMode, updateOrderInDBThunkCreator,
    writeFieldAC
} from "../../redux/reducers/orderReducer";

const ClientCard = () => {
    const dispatch = useDispatch();
    const {idOrder} = useParams();
    const state = useSelector(state => state.orders)

    const orders = useSelector(state => state.orders.orders)
    const client = orders.filter(o => o._id === idOrder)[0]
    useEffect(() => {
        {
            idOrder &&
            dispatch(setClientCard(client)) &&
            dispatch(setUpdateMode(true))
        }
    }, [])

    const writeUpdate = (e, nameField) => {
        dispatch(writeFieldAC(e.target.value, nameField))
    }
    return (
        <div>
            <form onSubmit={(event) => {
            }}>
                <div>
                    <label htmlFor="tourDate">Дата: </label>
                    <input type="date" id="tourDate" value={state.date.slice(0,10)}
                           onChange={(e) => {
                               dispatch(writeFieldAC((e.target.value), 'date'))
                           }} />
                </div>
                <div>
                    Тур: <input type="text" value={state.tourName}
                                onChange={(e) => {
                                    writeUpdate(e, 'tourName')
                                }} />
                </div>
                <div>
                    <label htmlFor="company">Компания: </label>
                    <select id="company" value={state.operator} onChange={(e) => {
                        writeUpdate(e, 'operator')
                    }}>
                        <option value="icTour">icTour</option>
                        <option value="mexicoLine">mexicoLine</option>
                    </select>
                </div>
                <div>Имя клиента: <input type="text" value={state.name} onChange={(e) => {
                    writeUpdate(e, 'name')
                }} /></div>
                <div>Отель: <input type="text" value={state.hotel} onChange={(e) => {
                    writeUpdate(e, 'hotel')
                }} /></div>
                <div>Номер комнаты: <input type="number" value={state.roomNumber} onChange={(e) => {
                    writeUpdate(e, 'roomNumber')
                }} /></div>
                <div>Взрослые: <input type="number" value={state.adult} onChange={(e) => {
                    writeUpdate(e, 'adult')
                }} /> цена: <input type="number" value={state.adultPrice} onChange={(e) => {
                    writeUpdate(e, 'adultPrice')
                }} />
                </div>
                <div>Дети: <input type="number" value={state.child} onChange={(e) => {
                    writeUpdate(e, 'child')
                }} />
                    цена: <input type="number" value={state.childPrice} onChange={(e) => {
                        writeUpdate(e, 'childPrice')
                    }} />
                </div>
                <div>Инфанты: <input type="number" value={state.infant} onChange={(e) => {
                    writeUpdate(e, 'infant')
                }} />
                    цена: <input type="number" value={state.infantPrice} onChange={(e) => {
                        writeUpdate(e, 'infantPrice')
                    }} />
                </div>

                <div>Комиссия: <input type="number" value={state.commission} onChange={(e) => {
                    writeUpdate(e, 'commission')
                }} /></div>

                <div>
                    <label htmlFor="contact">Контакты: </label>
                    <select id="contact" value={state.contact} onChange={(e) => {
                        writeUpdate(e, 'contact')
                    }}>
                        <option value="Instagram">Instagram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telegram">Telegram</option>
                        <option value="Viber">Viber</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div>Время пикапа: <input type="text" value={state.pickUpTime} onChange={(e) => {
                    writeUpdate(e, 'pickUpTime')
                }} /></div>
                <div>Гид: <input type="text" value={state.guide} onChange={(e) => {
                    writeUpdate(e, 'guide')
                }} /></div>
                <div>Примечание: <textarea value={state.note} onChange={(e) => {
                    writeUpdate(e, 'note')
                }} /></div>

                {/*<input type="submit" value="Отправить" />*/}
            </form>

            {state.updateMode &&
            <div>
                <button onClick={() => {dispatch(updateOrderInDBThunkCreator(state, idOrder))
                }}>update
                </button>
                <button onClick={() => {dispatch(deleteOrderThunkCreator(idOrder))
                }}>delete
                </button>
            </div>
            }
            {!state.updateMode &&
            <button onClick={() => {dispatch(saveOrderThunkCreator(state))
            }}>save</button>
            }
        </div>
    )
}

export default ClientCard