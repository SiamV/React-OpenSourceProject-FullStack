import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {sendTextTourThunkCreator, writeTextTourAC, writeTourTitleAC} from "../../redux/reducers/toursReducer";
import classes from './privateAdmin.module.css'

const PrivateAdmin = (props) => {
    const dispatch = useDispatch();
    const tourText = useSelector(state => state.tours.tourText);
    const tourTitle = useSelector(state => state.tours.tourTitle);

    return (
        <div className={classes.adminWrapper}>
            <input placeholder={'tour title'}
                   value={tourTitle}
                   onChange={(e) => {
                       dispatch(writeTourTitleAC(e.target.value))
                   }}
            />
            <textarea placeholder={'write text tour'}
                      value={tourText}
                      onChange={(e) => {
                          dispatch(writeTextTourAC(e.target.value))
                      }} />
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTextTourThunkCreator(tourTitle, tourText))
                    }}>create tour</button>
        </div>
    )
}

export default PrivateAdmin;