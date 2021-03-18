import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import {EditorState, convertFromRaw} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from "@draft-js-plugins/image";
import classes from "./pageTour.module.css";
import {Helmet} from "react-helmet";

const imagePlugin = createImagePlugin();

const PageTour = () => {
    const {pageLink} = useParams();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)

    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])

    return (
        <div>{tours.filter(t => t.pageLink === pageLink).map((t, index) => (
            <div key={t._id}>
                <Helmet>
                    <title>{t.tourTitle}</title>
                    <meta name="keywords" content={t.seoTitle} />
                    <meta name="description"content={t.seoDescription}/>
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
            </div>
        ))}
        </div>
    )
}

export default PageTour;