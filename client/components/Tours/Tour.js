import React from "react";
import {NavLink} from "react-router-dom";
import {convertFromRaw, Editor, EditorState} from 'draft-js';

import classes from './tours.module.css';

const Tour = (props) => {
    return (
        <div className={classes.toursWrapper}>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <h2 className={classes.h2}>{props.tourTitle}</h2>
            </NavLink>
            <Editor readOnly={true}
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(props.tourText)))}
            />
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <button className={classes.mainButton}>Reed more</button>
            </NavLink>
        </div>
    )
}

export default Tour;