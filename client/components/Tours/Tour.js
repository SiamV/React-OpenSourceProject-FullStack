import React from "react";
import {NavLink} from "react-router-dom";
import imgDefault from '../../images/imgDefault.jpg'

import classes from './tours.module.css';

const Tour = (props) => {
    let tourObject = JSON.parse(props.tourContent)
    return (
        <div className={classes.tourWrapper}>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <h2 className={classes.h2}>{props.tourTitle}</h2>
            </NavLink>
            <div className={classes.previewBlockWrapper}>
                <div className={classes.previewBlock}>
                    {(Object.keys(tourObject.entityMap).length !== 0)
                        ?<img alt={'Preview'} src={tourObject.entityMap[0].data.src}  />
                        : <img alt={'Preview'} src={imgDefault} />
                    }
                    <div>{`${JSON.stringify(tourObject.blocks[0].text.slice(0, 150))}   ...`}</div>
                </div>
            </div>
            <NavLink className={classes.navLinkH2} to={`/tour/${props.id}`}>
                <button className={classes.mainButton}>Reed more</button>
            </NavLink>
        </div>

    )
}

export default Tour;