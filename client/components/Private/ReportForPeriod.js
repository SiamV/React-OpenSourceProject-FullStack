import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {setOrdersThunkCreator, writeFieldAC} from "../../redux/reducers/orderReducer";
import classes from "./reportForPeriod.module.css"
import classes2 from "./clientCard.module.css";
import classes3 from "./createTours.module.css"
import {getFilteredOrders, setFromDateAC, setToDateAC} from "../../redux/reducers/reportReducer";

const ReportForPeriod = (props) => {
    useEffect(() => {
        dispatch(setOrdersThunkCreator())
    }, [])

    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)
    const fromDate = useSelector(state => state.report.fromDate)
    const toDate = useSelector(state => state.report.toDate)
    const filteredOrders = useSelector(state => state.report.filteredOrders)

    const filterDate = (db) => {
        return db.filter((order) => {
            return order.date > fromDate && order.date < toDate
        })
    }

    const exportPdf = (date1, date2) => {
        const input = document.getElementById("table")
        html2canvas(input).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            doc.addImage(imgData, 'JPEG', 10, 10,200, 280);
            // doc.text('same text o file', 10, 10)
            doc.save(`${new Date(date1).toUTCString().slice(5, 11)}-${new Date(date2).toUTCString().slice(5, 16)}.pdf`);
        });
    }

    return (
        <div className={classes.mainWrapper}>
            <div className={classes2.dateContainer}>
                <label htmlFor="fromDate">с: </label>
                <input type="date" id="fromDate" value={fromDate}
                       onChange={(e) => {
                           dispatch(setFromDateAC(e.target.value))
                       }} />
                <label htmlFor="ToDate">по: </label>
                <input type="date" id="ToDate" value={toDate}
                       onChange={(e) => {
                           dispatch(setToDateAC(e.target.value))
                       }} />
            </div>
            <div>
                <button className={classes3.MenuButton}
                        onClick={() => {
                            dispatch(getFilteredOrders(filterDate(orders)))
                        }}>show
                </button>
                <button className={classes3.MenuButton}
                        onClick={() => {
                            exportPdf(fromDate, toDate)
                        }}>send pdf
                </button>
            </div>

            <table
                id="table">
                <tbody>
                <tr>
                    <td>Дата</td>
                    <td>Отель</td>
                    <td>Имя</td>
                    <td>Тур</td>
                    <td>кол</td>
                    <td>цена</td>
                    <td>%</td>
                </tr>
                {filteredOrders.sort((a, b) => a.date < b.date ? -1 : 1).map((order, index) => {
                    return (
                        <tr key={index} id={`row${index}`}>
                            <td>{new Date(order.date).toUTCString().slice(5, 16)}</td>
                            <td>{order.hotel}</td>
                            <td>{order.name}</td>
                            <td>{order.tourName}</td>
                            <td>{order.adult}/{order.child}/{order.infant}</td>
                            <td>{order.adultPrice}/{order.childPrice}/{order.infantPrice}</td>
                            <td>{order.commission}</td>
                        </tr>
                    );
                })}
                <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>Итого:</td>
                    <td>{filteredOrders.reduce((result, order) => {
                        return result + order.commission
                    }, 0)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ReportForPeriod