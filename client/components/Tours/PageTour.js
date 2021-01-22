import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {setToursThunkCreator} from "../../redux/reducers/toursReducer";
import {Editor, EditorState, convertFromRaw} from 'draft-js';

const PageTour = () => {
    const {idTour} = useParams();
    const dispatch = useDispatch();
    const tours = useSelector(state => state.tours.tours)

    useEffect(() => {
        dispatch(setToursThunkCreator())
    }, [])

    return (
        <div>{tours.filter(t => t._id === idTour).map((t, index) => (
            <div key={t._id}>
                <div>{t.tourTitle}</div>
                <Editor readOnly={true}
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))}
                />
            </div>
        ))}
        </div>
    )
}

export default PageTour;