import React from "react";
import {NavLink} from "react-router-dom";

import classes from './tours.module.css';

const Tour = (props) => {
    let tourObject = JSON.parse(props.tourText)
    return (
        <div className={classes.toursWrapper}>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <h2 className={classes.h2}>{props.tourTitle}</h2>
            </NavLink>
            {/*<Editor readOnly={true}*/}
            {/*        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(props.tourText)))}*/}
            {/*/>*/}
            <div>{`${JSON.stringify(tourObject.blocks[0].text.slice(0,150))}   ...`}</div>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <button className={classes.mainButton}>Reed more</button>
            </NavLink>
        </div>
    )
}

export default Tour;