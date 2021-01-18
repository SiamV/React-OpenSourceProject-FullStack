import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';

const PageTour = () => {
    const {idTour} = useParams();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)

    // EditorState.createWithContent(convertFromRaw(tours[0].tour)),
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    console.log(editorState)
    console.log(tours)

    useEffect(() => {
        dispatch(setToursThunkCreator())
        setEditorState({new:1});
    }, [])
    return (
        <div>{tours.filter(t => t._id === idTour).map((t, index) => (
            <div key={t._id}>
                <div>{t.tourTitle}</div>
                {/*<div>{JSON.stringify(t.tour)}</div>*/}
            </div>
        ))}</div>
    )
}

export default PageTour;