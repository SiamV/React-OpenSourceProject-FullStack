import React, {useState} from "react";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import classes from './TestTextEditor.module.css';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useDispatch} from "react-redux";
import {savePhotoThC, sendTextTourThunkCreator} from "../../redux/reducers/toursReducer";

const TestTextEditor = () => {
    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    function uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                dispatch(savePhotoThC(file))
                resolve('image is upload');
            })
    }

    return (
        <div className={classes.TestTextEditorWrapper}>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                placeholder="Write something!"
                toolbar={{
                    inline: {inDropdown: true},
                    list: {inDropdown: true},
                    textAlign: {inDropdown: true},
                    link: {inDropdown: true},
                    history: {inDropdown: true},
                    image: {
                        alignmentEnabled: true,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                        alt: {present: true, mandatory: true},
                        defaultSize: {
                            height: 'auto',
                            width: '90%',
                        }
                    },
                }}
                // onBlur={(event, editorState) => {
                //     dispatch(sendTextTourThunkCreator("name", event.target.innerHTML))
                //     console.log(event, editorState)}}
            />
            <button className={classes.MenuButton}
                    onClick={() => {
                        console.log(editorState)
                    }}>create tour
            </button>
        </div>
    );
}

export default TestTextEditor;