import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteInfoAC, sendTextTourThunkCreator, writeTourTitleAC} from "../../redux/reducers/toursReducer";
import {savePhotoThC} from "../../redux/reducers/textEditorReducer";
import classes from './privateAdmin.module.css'
import TextEditor from "../TextEditorDraft/TextEditor";

const PrivateAdmin = (props) => {
    const dispatch = useDispatch();
    const tourTitle = useSelector(state => state.tours.tourTitle);
    const sendStatusOk = useSelector(state => state.tours.sendStatusOk);

    //get convert data from draft.js editorState (Text Field)
    let TextField;
    const onData = (TextEditorData) => {
        TextField = TextEditorData;
    }

    return (
        <div className={classes.adminWrapper}>
            {/*add images to server*/}
            <input placeholder={'Add images'}
                   type={'file'}
                   onChange={(e) => {
                       if (e.target.files.length) {
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
            <TextEditor onData={onData} />
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTextTourThunkCreator(tourTitle, TextField))
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