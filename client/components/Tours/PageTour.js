import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';

const PageTour = () => {
    const {idTour} = useParams();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)

    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])

    const DB = convertFromRaw(JSON.parse(tours.map((t, index) => (t.tour))))
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(
        DB));
    console.log(editorState)

    return (
        <div>
        <div>{tours.filter(t => t._id === idTour).map((t, index) => (
            <div key={t._id}>
                <div>{t.tourTitle}</div>
                <div>{t.tour}</div>
            </div>
        ))}
        </div>
            {/*<div>{editorState}</div>*/}
        </div>
    )
}

export default PageTour;