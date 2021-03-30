import React, {useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {
    deleteInfoAC,
    deleteTourThunkCreator,
    getTourInfoThunkCreator,
    setToursThunkCreator
} from "../../redux/reducers/toursReducer";
import {EditorState, convertFromRaw} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from "@draft-js-plugins/image";
import classes from "./pageTour.module.css";
import classes2 from '../Private/createTours.module.css';
import {Helmet} from "react-helmet";

const imagePlugin = createImagePlugin();

const PageTour = () => {
    const {pageLink} = useParams();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)
    const isAuth = useSelector(s => s.login.isAuth)
    const sendDeleteStatusOk = useSelector(state => state.tours.sendDeleteStatusOk);

    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])

    return (
        <div>{tours.filter(t => t.pageLink === pageLink).map((t, index) => (
            <div key={t._id}>
                <Helmet>
                    <title>{t.tourTitle}</title>
                    <meta name="keywords" content={t.seoTitle} />
                    <meta name="description" content={t.seoDescription} />
                </Helmet>
                <h2 className={classes.h2}>{t.tourTitle}</h2>
                <div className={classes.EditorBlockStyle1}>
                    <Editor readOnly={true}
                            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))}
                            plugins={[imagePlugin]}
                            onChange={() => {
                            }}
                    />
                </div>

                <div>
                    {isAuth &&
                    <div>
                        <NavLink to={'/admin/my-editor'}>
                            <button className={classes2.MenuButton}
                                    type='button'
                                    onClick={() => {
                                        dispatch(getTourInfoThunkCreator(t.pageLink))
                                    }}>update
                            </button>
                        </NavLink>

                        <button className={classes2.MenuButton}
                                type='button'
                                style={{backgroundColor: 'grey'}}
                                onClick={() => {
                                    window.confirm('страница будет удалена!') ?
                                        dispatch(deleteTourThunkCreator(t.pageLink)) :
                                        null
                                }}>delete
                        </button>
                    </div>
                    }
                </div>
                {(sendDeleteStatusOk) &&
                <div className={classes2.popup}>
                    <div className={classes2.popupContent}>Tour is deleted</div>
                    <button className={classes2.buttonInfo}
                            type="button"
                            onClick={() => {
                                dispatch(deleteInfoAC())
                            }}>Ok
                    </button>
                </div>
                }
            </div>
        ))}
        </div>
    )
}

export default PageTour;