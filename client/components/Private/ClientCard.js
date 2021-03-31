import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {
    deleteOrderThunkCreator,
    saveOrderThunkCreator,
    setClientCard, setDeleteStatus, setFieldForAddMoreOrder, setSaveAndAddStatus, setSaveStatus,
    setUpdateMode, setUpdateStatus, updateOrderInDBThunkCreator,
    writeFieldAC
} from "../../redux/reducers/orderReducer";
import classes from './clientCard.module.css';
import classes2 from './createTours.module.css'
import {deleteInfoAC} from "../../redux/reducers/toursReducer";


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
            <form className={classes.formWrapper} onSubmit={(event) => {
            }}>
                <div className={classes.dateContainer}>
                    <label htmlFor="tourDate">Дата: </label>
                    <input type="date" id="tourDate" value={state.date && state.date.slice(0, 10)}
                           onChange={(e) => {
                               dispatch(writeFieldAC((e.target.value), 'date'))
                           }} />
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="tour">Тур: </label>

                    <select id="tour" value={state.tourName} onChange={(e) => {
                        writeUpdate(e, 'tourName')
                    }}>
                        <option value="Выберите тур">Выберите тур</option>
                        <option value="Чиченица rus">Чиченица rus</option>
                        <option value="Розовые озера rus">Розовые озера rus</option>
                        <option value="Чиченица eng">Чиченица eng</option>
                        <option value="Xcaret">Xcaret</option>
                        <option value="Xplor">Explor</option>
                        <option value="Xelha">Xelha</option>
                        <option value="Combo1:Xcaret+Explor">Combo1:Xcaret+Explor</option>
                        <option value="Combo2:Xcaret+Xelha">Combo2:Xcaret+Xelha</option>
                        <option value="Combo3:Explor+Xelha">Combo3:Explor+Xelha</option>
                        <option value="Черепахи+сенот">Черепахи+сенот</option>
                        <option value="Приватка">Приватка</option>
                        <option value="Острова">Острова</option>
                        <option value="Дайвинг">Дайвинг</option>
                    </select>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="company">Компания: </label>
                    <select id="company" value={state.operator} onChange={(e) => {
                        writeUpdate(e, 'operator')
                    }}>
                        <option value="Выберите компанию">Выберите компанию</option>
                        <option value="icTour">icTour</option>
                        <option value="mexicoLine">mexicoLine</option>
                    </select>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="nameClient">ФИО: </label>
                    <input type="text" id="nameClient" value={state.name} onChange={(e) => {
                        writeUpdate(e, 'name')
                    }} />
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="hotel">Отель: </label>
                    <input type="text" id={'hotel'} value={state.hotel} onChange={(e) => {
                        writeUpdate(e, 'hotel')
                    }} /></div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="roomNumber">Номер комнаты: </label>
                        <input type="number" id={'roomNumber'} value={state.roomNumber} onChange={(e) => {
                            writeUpdate(e, 'roomNumber')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="adult">Взрослые: </label>
                        <input type="number" id={'adult'} value={state.adult} style={{marginLeft: '12px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'adult')
                               }} />
                    </div>
                    <div>
                        <label htmlFor="priceAdult">цена: </label>
                        <input type="number" id={'priceAdult'} value={state.adultPrice} onChange={(e) => {
                            writeUpdate(e, 'adultPrice')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="child">Дети: </label>
                        <input type="number" id={'child'} value={state.child} style={{marginLeft: '46px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'child')
                               }} />
                    </div>
                    <div>
                        <label htmlFor="priceChild">цена: </label>
                        <input type="number" id={'priceChild'} value={state.childPrice} onChange={(e) => {
                            writeUpdate(e, 'childPrice')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="infant">Инфанты: </label>
                        <input type="number" id={'infant'} value={state.infant} style={{marginLeft: '14px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'infant')
                               }} />
                    </div>
                </div>

                <div className={classes.numberContainer}>
                    <label htmlFor="commission">Комиссия: </label>
                    <div>
                        <label htmlFor="commission">итого </label>
                        <input type="number" id={'commission'} value={state.commission} onChange={(e) => {
                            writeUpdate(e, 'commission')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="pickUpTime">Время пикапа: </label>
                        <input type="text" id={'pickUpTime'} value={state.pickUpTime} onChange={(e) => {
                            writeUpdate(e, 'pickUpTime')
                        }} />
                    </div>
                    <div>
                        <label htmlFor="guide">Гид: </label>
                        <input type="text" id={'guide'} value={state.guide} onChange={(e) => {
                            writeUpdate(e, 'guide')
                        }} />
                    </div>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="contact">Контакты: </label>
                    <select id="contact" value={state.contact} onChange={(e) => {
                        writeUpdate(e, 'contact')
                    }}>
                        <option value="...">...</option>
                        <option value="Instagram">Instagram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telegram">Telegram</option>
                        <option value="Viber">Viber</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="note">Примечание: </label>
                    <textarea id={'note'} value={state.note} onChange={(e) => {
                        writeUpdate(e, 'note')
                    }} />
                </div>

                {/*<input type="submit" value="Отправить" />*/}
            </form>

            {/*block buttons*/}
            <div className={classes.wrapperButtons}>
                {state.updateMode ?
                    <div>
                        <button className={classes2.MenuButton}
                                onClick={() => {
                                    dispatch(updateOrderInDBThunkCreator(state, idOrder))
                                }}>update
                        </button>
                        <button className={classes2.MenuButton}
                                type='button'
                                style={{backgroundColor: 'grey'}}
                                onClick={() => {
                                    window.confirm('страница будет удалена!') ?
                                        dispatch(deleteOrderThunkCreator(idOrder)) :
                                        null
                                }}>delete
                        </button>
                        <button className={classes2.MenuButton}
                                id={'saveAndAddUpdate'}
                                onClick={(e) => {
                                    dispatch(setFieldForAddMoreOrder(state))
                                    dispatch(setUpdateStatus(false))
                                    dispatch(setUpdateMode(false))
                                }}>add +1
                        </button>
                    </div> :
                    <div>
                        <button className={classes2.MenuButton}
                                id={'save'}
                                onClick={(e) => {
                                    dispatch(saveOrderThunkCreator(state, e.target.id))
                                }}>save
                        </button>
                        <button className={classes2.MenuButton}
                                id={'saveAndAdd'}
                                onClick={(e) => {
                                    dispatch(saveOrderThunkCreator(state, e.target.id))
                                }}>save and add
                        </button>
                    </div>
                }
                <div className={classes.rightBlock}>
                    <button className={classes2.MenuButton}><NavLink to={'/admin/tour-order'}>back</NavLink></button>
                </div>
            </div>

            {/*block changed markers and link*/}
            {state.deleteStatus &&
            <div className={classes2.popup}>
                <div className={classes2.popupContent}>Заказ удален</div>
                <NavLink to={'/admin/tour-order'}>
                    <button className={classes2.buttonInfo}
                            type="button"
                            onClick={() => {
                                dispatch(setDeleteStatus(false))
                            }}>Ok
                    </button>
                </NavLink>
            </div>}
            {state.saveStatus &&
            <div className={classes2.popup}>
                <div className={classes2.popupContent}>Заказ сохранен</div>
                <NavLink to={'/admin/tour-order'}>
                    <button className={classes2.buttonInfo}
                            type="button"
                            onClick={() => {
                                dispatch(setSaveStatus(false))
                            }}>Ok
                    </button>
                </NavLink>
            </div>}
            {state.saveAndAddStatus &&
            <div className={classes2.popup}>
                <div className={classes2.popupContent}>Заказ сохранен</div>
                    <button className={classes2.buttonInfo}
                            type="button"
                            onClick={() => {
                                dispatch(setSaveAndAddStatus(false))
                                dispatch(setFieldForAddMoreOrder(state))
                            }}>Ok
                    </button>
            </div>}
            {state.updateStatus &&
            <div className={classes2.popup}>
                <div className={classes2.popupContent}>Заказ изменен</div>
                <NavLink to={'/admin/tour-order'}>
                    <button className={classes2.buttonInfo}
                            type="button"
                            onClick={() => {
                                dispatch(setUpdateStatus(false))
                                dispatch(setUpdateMode(false))
                            }}>Ok
                    </button>
                </NavLink>
            </div>}
        </div>
    )
}

export default ClientCard