import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Editor from "@draft-js-plugins/editor";
import {convertFromRaw, EditorState} from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";
import {Helmet} from 'react-helmet';

import {
    deleteInfoAC,
    deleteTourThunkCreator,
    getTourInfoThunkCreator,
    setToursThunkCreator
} from "../../redux/reducers/toursReducer";
import Preloader from "../common/Preloader/Preloader";
import classes from "../Tours/pageTour.module.css";
import {NavLink} from "react-router-dom";
import classes2 from "../Private/createTours.module.css";


const imagePlugin = createImagePlugin();

const Posts = (props) => {
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours);
    const isLoading = useSelector(state => state.tours.isLoading);
    const isAuth = useSelector(s => s.login.isAuth);
    const sendDeleteStatusOk = useSelector(state => state.tours.sendDeleteStatusOk);

    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])

    if (isLoading === false) {
        return <Preloader />
    }
    return (
        <div>
            {[...tours].filter(t => t.category === props.categoryPost).reverse().map((t, index) => (
                <div key={t._id} className={classes.PostWrapper}>
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
                    {/*block for update and delete*/}
                    <div>
                        {isAuth &&
                        <div>
                            <NavLink to={'/my-editor'}>
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
                                            <NavLink to={`/`}>back</NavLink>
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

export default Posts;