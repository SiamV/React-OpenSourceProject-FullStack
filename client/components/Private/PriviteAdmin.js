import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteInfoAC, savePhotoThC,
    sendTextTourThunkCreator,
    writeTextTourAC,
    writeTourTitleAC
} from "../../redux/reducers/toursReducer";
import classes from './privateAdmin.module.css'
import TextEditor2 from "../TestTextEditor/TextEditor2";

const PrivateAdmin = (props) => {
    const dispatch = useDispatch();
    const tourText = useSelector(state => state.tours.tourText);
    const tourTitle = useSelector(state => state.tours.tourTitle);
    const sendStatusOk = useSelector(state => state.tours.sendStatusOk);

    return (
        <div className={classes.adminWrapper}>
            {/*add images to server*/}
            <input placeholder={'Add images'}
                   type={'file'}
                   onChange={(e)=>{
                       if(e.target.files.length){
                           dispatch(savePhotoThC(e.target.files[0]))
                       }
                   }}
            />
            {/*Write to tour*/}
            <input placeholder={'tour title'}
                   value={tourTitle}
                   onChange={(e) => {
                       dispatch(writeTourTitleAC(e.target.value))
                   }}
            />
            <TextEditor2 />
            <textarea placeholder={'write text tour'}
                      value={tourText}
                      onChange={(e) => {
                          dispatch(writeTextTourAC(e.target.value))
                      }} />
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTextTourThunkCreator(tourTitle, tourText))
                    }}>create tour
            </button>
            {(sendStatusOk) &&
            <div className={classes.popup}>
                <div className={classes.popupContent}>Tour is created</div>
                <button className={classes.buttonInfo}
                        type="button"
                        onClick={() => {
                            dispatch(deleteInfoAC(false))
                        }}>Ok
                </button>
            </div>}
        </div>
    )
}

export default PrivateAdmin;