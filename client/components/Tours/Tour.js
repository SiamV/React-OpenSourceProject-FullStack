import React from "react";
import {NavLink} from "react-router-dom";

import classes from './tours.module.css';

const Tour = (props) => {
    return (
        <div className={classes.tourWrapper}>
            <NavLink to={'/tour/' + props.id}>{props.tour}</NavLink>
        </div>
    )
}

export default Tour;