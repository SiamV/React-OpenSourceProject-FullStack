import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

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
import classes3 from "./createTours.module.css";


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

    const exportPdf2 = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(16);

        const title = `Order:`;
        const headers = [["", ""]];

        const data = [['Date: ', new Date(client.date).toUTCString().slice(5, 16)], ['Tour: ',client.tourName],
            ['Pax and Price: ', `${client.adult}/${client.child}/${client.infant}   ${client.adultPrice}/${client.childPrice}/${client.infantPrice}`],
            ['Hotel: ',client.hotel], ['Name: ',client.name],
            ['Room number: ',client.roomNumber]];

        let content = {
            styles: {fontSize: 24},
            theme: 'plain',
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        autoTable(doc, content)
        doc.save(`${new Date(client.date).toUTCString().slice(5, 11)}-${client.tourName.slice(0, 7)}-${client.name}.pdf`)
        // doc.send()
    }

    return (
        <div>
            <form className={classes.formWrapper} onSubmit={(event) => {
            }}>
                <div className={classes.dateContainer}>
                    <label htmlFor="tourDate">Date: </label>
                    <input type="date" id="tourDate" value={state.date && state.date.slice(0, 10)}
                           onChange={(e) => {
                               dispatch(writeFieldAC((e.target.value), 'date'))
                           }} />
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="tour">Tour: </label>

                    <select id="tour" value={state.tourName} onChange={(e) => {
                        writeUpdate(e, 'tourName')
                    }}>
                        <option value="Выберите тур">Выберите тур</option>
                        <option value="ChichenItza rus">ChichenItza rus</option>
                        <option value="Pink lake rus">Pink lake rus</option>
                        <option value="ChichenItza eng">ChichenItza eng</option>
                        <option value="Xcaret">Xcaret</option>
                        <option value="Xplor">Explor</option>
                        <option value="Xelha">Xelha</option>
                        <option value="Combo1:Xcaret+Explor">Combo1:Xcaret+Explor</option>
                        <option value="Combo2:Xcaret+Xelha">Combo2:Xcaret+Xelha</option>
                        <option value="Combo3:Explor+Xelha">Combo3:Explor+Xelha</option>
                        <option value="Tortugas+cenote">Tortugas+cenote</option>
                        <option value="Private tour">Private tour</option>
                        <option value="Islands">Islands</option>
                        <option value="Diving">Diving</option>
                    </select>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="company">Company: </label>
                    <select id="company" value={state.operator} onChange={(e) => {
                        writeUpdate(e, 'operator')
                    }}>
                        <option value="Выберите компанию">Выберите компанию</option>
                        <option value="icTour">icTour</option>
                        <option value="mexicoLine">mexicoLine</option>
                    </select>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="nameClient">Name: </label>
                    <input type="text" id="nameClient" value={state.name} onChange={(e) => {
                        writeUpdate(e, 'name')
                    }} />
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="hotel">Hotel: </label>
                    <input type="text" id={'hotel'} value={state.hotel} onChange={(e) => {
                        writeUpdate(e, 'hotel')
                    }} /></div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="roomNumber">Room number: </label>
                        <input type="number" id={'roomNumber'} value={state.roomNumber} onChange={(e) => {
                            writeUpdate(e, 'roomNumber')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="adult">Adults: </label>
                        <input type="number" id={'adult'} value={state.adult} style={{marginLeft: '12px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'adult')
                               }} />
                    </div>
                    <div>
                        <label htmlFor="priceAdult">price: </label>
                        <input type="number" id={'priceAdult'} value={state.adultPrice} onChange={(e) => {
                            writeUpdate(e, 'adultPrice')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="child">Children: </label>
                        <input type="number" id={'child'} value={state.child} style={{marginLeft: '46px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'child')
                               }} />
                    </div>
                    <div>
                        <label htmlFor="priceChild">price: </label>
                        <input type="number" id={'priceChild'} value={state.childPrice} onChange={(e) => {
                            writeUpdate(e, 'childPrice')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="infant">Infants: </label>
                        <input type="number" id={'infant'} value={state.infant} style={{marginLeft: '14px'}}
                               onChange={(e) => {
                                   writeUpdate(e, 'infant')
                               }} />
                    </div>
                </div>

                <div className={classes.numberContainer}>
                    <label htmlFor="commission">Profit: </label>
                    <div>
                        <label htmlFor="commission">total </label>
                        <input type="number" id={'commission'} value={state.commission} onChange={(e) => {
                            writeUpdate(e, 'commission')
                        }} />
                    </div>
                </div>
                <div className={classes.numberContainer}>
                    <div>
                        <label htmlFor="pickUpTime">PickUp time: </label>
                        <input type="text" id={'pickUpTime'} value={state.pickUpTime} onChange={(e) => {
                            writeUpdate(e, 'pickUpTime')
                        }} />
                    </div>
                    <div>
                        <label htmlFor="guide">Guid: </label>
                        <input type="text" id={'guide'} value={state.guide} onChange={(e) => {
                            writeUpdate(e, 'guide')
                        }} />
                    </div>
                </div>
                <div className={classes.textContainer}>
                    <label htmlFor="contact">Contacts: </label>
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
                    <label htmlFor="note">Note: </label>
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
            <div>
                <button className={classes2.MenuButton}
                        style={{backgroundColor: 'orange'}}
                        onClick={() => {
                            exportPdf2()
                        }}>send pdf
                </button>
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