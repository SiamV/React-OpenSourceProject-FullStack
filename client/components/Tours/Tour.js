import React from "react";
import {NavLink} from "react-router-dom";

import classes from './tours.module.css';

const Tour = (props) => {
    return (
        <div className={classes.toursWrapper}>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <h2 className={classes.h2}>{props.tourTitle}</h2>
            </NavLink>
            <div>Республика Черногория охватывает юго-западную, приморскую часть Балканского полуострова. На западе Черногория граничит с Хорватией, на северо-западе — с Боснией и Герцеговиной, на севере, северо-востоке и востоке — с Сербией, на юго-востоке — с Албанией. Имеет выход к Адриатическому морю. Численность населения Черногории составляет около 650 000 человек. Столица</div>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <button className={classes.mainButton}>Reed more</button>
            </NavLink>
        </div>
    )
}

export default Tour;