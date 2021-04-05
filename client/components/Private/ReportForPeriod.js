import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

import {setOrdersThunkCreator, writeFieldAC} from "../../redux/reducers/orderReducer";
import classes from "./reportForPeriod.module.css"
import classes2 from "./clientCard.module.css";
import classes3 from "./createTours.module.css"
import {getFilteredOrders, setFromDateAC, setToDateAC} from "../../redux/reducers/reportReducer";
// import '../../assets/Lora-Regular-normal.js'
// import myFont from '../../assets/Roboto-Regular.bin'

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

    //Добавляем готовую таблицу в отчет
    const exportPdf = (date1, date2) => {
        const doc = new jsPDF()
//documentation
//         const myFont = ... // load the *.ttf font file as binary string
//
// // add the font to jsPDF
//         doc.addFileToVFS("MyFont.ttf", myFont);
//         doc.addFont("MyFont.ttf", "MyFont", "normal");

//         const myFont = fetch('https://fonts.googleapis.com/css2?family=Roboto')
//             .then((response) => {
//                 return response;
//             })
//         doc.addFileToVFS("MyFont.ttf", myFont);
//         doc.addFont("MyFont.ttf", "MyFont", "normal");

        // doc.setFont('Lora-Regular', 'normal')
        autoTable(doc, {
            html: '#table',
            styles: {
                textColor: [0, 0, 0],
                columnStyles: {0: {fontStyle: 'bold'}}
            }
        })
        doc.save(`${new Date(date1).toUTCString().slice(5, 11)}-${new Date(date2).toUTCString().slice(5, 16)}.pdf`)
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
                        style={{backgroundColor: 'orange'}}
                        onClick={() => {
                            exportPdf(fromDate, toDate)
                        }}>send pdf
                </button>
            </div>

            <table
                id="table">
                <tbody>
                <tr>
                    <td>Date</td>
                    <td>Hotel</td>
                    <td>Name</td>
                    <td>Tour</td>
                    <td>pax</td>
                    <td>price</td>
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
                    <td>Total:</td>
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


// exportPDF = () => {
//     const unit = "pt";
//     const size = "A4"; // Use A1, A2, A3 or A4
//     const orientation = "portrait"; // portrait or landscape
//
//     const marginLeft = 40;
//     const doc = new jsPDF(orientation, unit, size);
//
//     doc.setFontSize(15);
//
//     const title = "My Awesome Report";
//     const headers = [["NAME", "PROFESSION"]];
//
//     const data = this.state.people.map(elt=> [elt.name, elt.profession]);
//
//     let content = {
//         startY: 50,
//         head: headers,
//         body: data
//     };
//
//     doc.text(title, marginLeft, 40);
//     doc.autoTable(content);
//     doc.save("report.pdf")
// }