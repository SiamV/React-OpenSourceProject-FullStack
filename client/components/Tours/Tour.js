import React from "react";

import classes from './tours.module.css';

const Tour = (props) => {
    return (
        <div className={classes.tourWrapper}>
            {props.tour}
        </div>
    )
}

export default Tour;