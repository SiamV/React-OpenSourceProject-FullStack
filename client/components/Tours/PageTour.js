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


    // const [editorState2, setEditorState2] = React.useState(
    //     EditorState.createEmpty()
    // );
    // console.log(editorState2)
    // // const DB = convertFromRaw(JSON.parse(tours.map((t, index) => (t.tour))))
    // const [editorState1, setEditorState1] = React.useState(tours);
    // console.log(tours)
    // console.log(editorState1)
    // useEffect(() => {
    //     setEditorState1(editorState1.map((t, index) =>
    //         ({...t, tour: EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))})
    //     ))}, [])
    // console.log(editorState1.tour)
    //
    // //content: EditorState.createWithContent(convertFromRaw(JSON.parse(t.tour)))

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