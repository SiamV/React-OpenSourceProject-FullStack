import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Editor from "@draft-js-plugins/editor";
import {convertFromRaw, EditorState} from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";

import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import Preloader from "../common/Preloader/Preloader";
import classes from "../Tours/pageTour.module.css";


const imagePlugin = createImagePlugin();

const Posts = (props) => {
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)
    const isLoading = useSelector(state => state.tours.isLoading)

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

export default Posts;