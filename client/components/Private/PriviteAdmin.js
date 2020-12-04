import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {sendTextTourThunkCreator, writeTextTourAC} from "../../redux/reducers/toursReducer";
import classes from './privateAdmin.module.css'

const PrivateAdmin = (props) => {
    const dispatch = useDispatch();
    const tourText = useSelector(state => state.tours.tourText);

    return (
        <div className={classes.adminWrapper}>
            <textarea placeholder={'write text tour'}
                      value={tourText}
                      onChange={(e) => {
                          dispatch(writeTextTourAC(e.target.value))
                      }} />
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTextTourThunkCreator(tourText))
                    }}>create tour</button>
        </div>
    )
}

export default PrivateAdmin;