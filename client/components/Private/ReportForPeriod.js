import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setOrdersThunkCreator, writeFieldAC} from "../../redux/reducers/orderReducer";
import classes from "./clientCard.module.css";
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

    return (
        <div>
            <div className={classes.dateContainer}>
                <label htmlFor="fromDate">C: </label>
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
                <button onClick={() => {
                    dispatch(getFilteredOrders(filterDate(orders)))
                }}>show
                </button>
            </div>
            <div>
                <table border={'1'} cellPadding="5" cellSpacing="5">
                    <tbody>

                    <tr>
                        <th>Date:</th>
                        <th>Tour:</th>
                    </tr>

                    <tr>
                        <td>{filteredOrders.map((order) => {
                            return new Date(order.date).toUTCString().slice(5, 16)
                        })}
                        </td>
                        <td>{filteredOrders.map((order) => {
                            return order.tourName
                        })}
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportForPeriod