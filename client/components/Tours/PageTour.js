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

    // const DB = convertFromRaw(JSON.parse(tours.map((t, index) => (t.tour))))
    const [editorState, setEditorState] = React.useState(tours);
    console.log(editorState)
    console.log(tours)
    useEffect(() => {
        setEditorState(editorState.map((t, index) =>
            ({...t, tour: EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))})
        ))}, [])

    //content: EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))

    return (
        <div>
        <div>{editorState.filter(t => t._id === idTour).map((t, index) => (
            <div key={t._id}>
                <div>{t.tourTitle}</div>
                {/*<Editor readOnly={true} editorState={t.tour.getCurrentContent()} />*/}
            </div>
        ))}
        </div>
            {/*<div>{editorState}</div>*/}
        </div>
    )
}

export default PageTour;