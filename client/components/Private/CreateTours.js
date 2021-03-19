import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteInfoAC,
    sendTourToDBThunkCreator, writePageLink, writeSeoDescription, writeSeoTitle,
    writeTourCategoryAC, writeTourContentAC,
    writeTourTitleAC
} from "../../redux/reducers/toursReducer";
import {savePhotoThC} from "../../redux/reducers/textEditorReducer";
import classes from './createTours.module.css'
import TextEditor from "../TextEditorDraft/TextEditor";
import TextEditorHooks from "../TextEditorDraft/TextEditorHooks";


const CreateTours = () => {
    const dispatch = useDispatch();
    const tourTitle = useSelector(state => state.tours.tourTitle);
    const tourContent = useSelector(state => state.tours.tourContent);
    const tourCategory = useSelector(state => state.tours.category);
    const seoTitle = useSelector(state => state.tours.seoTitle);
    const seoDescription = useSelector(state => state.tours.seoDescription);
    const pageLink = useSelector(state => state.tours.pageLink);
    const sendStatusOk = useSelector(state => state.tours.sendStatusOk);

    //get convert data from draft.js editorState (tour's content)
    //we can delete it because use dispatch in TextEditorHooks.js
    const onData = (TextEditorData) => {
        dispatch(writeTourContentAC(TextEditorData))
    }

    return (
        <div className={classes.adminWrapper}>
            {/*add images to server*/}
            <label htmlFor={'add_img_gallery'}>
                Upload img to gallery:
                <input type={'file'}
                       id={'add_img_gallery'}
                       onChange={(e) => {
                           if (e.target.files.length) {
                               dispatch(savePhotoThC(e.target.files[0]))
                           }
                       }}
                />
            </label>
            <input className={classes.title}
                   placeholder={'page Link'}
                   required
                   value={pageLink}
                   onChange={(e) => {
                       dispatch(writePageLink(e.target.value))
                   }}
            />
            {/*Write tour*/}
            <input className={classes.title}
                   placeholder={'tour title'}
                   value={tourTitle}
                   onChange={(e) => {
                       dispatch(writeTourTitleAC(e.target.value))
                   }}
            />
            <div className={classes.editor}>
                <TextEditorHooks onData={onData} />
            </div>
            <select className={classes.select}
                    value={tourCategory}
                    onChange={(e) => {
                        dispatch(writeTourCategoryAC(e.target.value))
                    }}>
                <option value="news">Новости</option>
                <option value="tour">Тур</option>
                <option value="main">На главную</option>
            </select>
            {/*Write SEO for tour*/}
            <input className={classes.title}
                   placeholder={'SEO title'}
                   value={seoTitle}
                   onChange={(e) => {
                       dispatch(writeSeoTitle(e.target.value))
                   }}
            />
            <input className={classes.title}
                   placeholder={'SEO Description'}
                   value={seoDescription}
                   onChange={(e) => {
                       dispatch(writeSeoDescription(e.target.value))
                   }}
            />

            {/*Save tour in DB and clean state*/}
            <button className={classes.MenuButton}
                    type="button"
                    onClick={() => {
                        dispatch(sendTourToDBThunkCreator(
                            tourTitle,
                            tourContent,
                            tourCategory,
                            seoTitle,
                            seoDescription,
                            pageLink
                            ))
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