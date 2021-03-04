import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteInfoAC,
    sendTourToDBThunkCreator,
    writeTourCategoryAC, writeTourContentAC,
    writeTourTitleAC
} from "../../redux/reducers/toursReducer";
import {savePhotoThC} from "../../redux/reducers/textEditorReducer";
import classes from './createTours.module.css'
import TextEditor from "../TextEditorDraft/TextEditor";
import TestTextEditorHooks from "../TextEditorDraft/TestTextEditorHooks";


const CreateTours = () => {
    const dispatch = useDispatch();
    const tourTitle = useSelector(state => state.tours.tourTitle);
    const tourCategory = useSelector(state => state.tours.category);
    const tourContent = useSelector(state => state.tours.tourContent);
    const sendStatusOk = useSelector(state => state.tours.sendStatusOk);

    //get convert data from draft.js editorState (tour's content)
    const onData = (TextEditorData) => {
        dispatch(writeTourContentAC(TextEditorData))
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
            {/*Editor cover div for development. Need delete for production*/}
            <div className={classes.devTestWrapper} ><TestTextEditorHooks onData={onData} /></div>

            <select value={tourCategory} onChange={(e) => {
                dispatch(writeTourCategoryAC(e.target.value))
            }}>
                <option value="news">Новости</option>
                <option value="tour">Тур</option>
                <option value="main">На главную</option>
            </select>
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTourToDBThunkCreator(tourTitle, tourContent, tourCategory))
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

export default CreateTours;