import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Editor, EditorState, AtomicBlockUtils, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import './TextEditor.css'
import classes from './TextEditor.module.css'
import {getSrcImageFromServer} from "../../redux/reducers/toursReducer";

const TestTextEditorHooks = () => {
    const dispatch = useDispatch();
    const urls = useSelector(state => state.tours.imagesUrls);
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );
    const editor = useRef(null);
    const focusEditor = () => {
        editor.current.focus()
    }

    const contentState = editorState.getCurrentContent();
    const contentToSave = JSON.stringify(convertToRaw(contentState));
    //callback onData to give data to parent (PrivateAdmin) for save in DB
    // this.props.onData(contentToSave);
    // console.log(contentState)
    console.log(contentToSave)

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    const onAddImage = (src) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            {src: urls[0]} //url если брать из стейта, src если указать путь с компа
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity});
        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
    };

    const mediaBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false
            };
        }
        return null;
    }

    const Image = (props) => {
        if (!!props.src) {
            return <img src={props.src} />;
        }
        return null;
    };

    const Media = (props) => {

        const entity = props.contentState.getEntity(props.block.getEntityAt(0));

        const {src} = entity.getData();
        const type = entity.getType();

        let media;
        if (type === 'image') {
            media = <Image src={src} />;
        }

        return media;
    };


    return (
        <div>
            <div>Hello Editor!</div>
            <input type={'file'}
                   onChange={(e) => {
                       if (e.target.files.length) {
                           onAddImage(URL.createObjectURL(e.target.files[0]))
                       }
                   }}
                   style={{
                       fontSize: "16px",
                       textAlign: "center",
                       padding: "2px",
                       margin: "2px"
                   }}
                   placeholder={'Attach images'}
            />
            <button onClick={()=>{dispatch(getSrcImageFromServer())}}>set img</button>


            <div className={classes.EditorBlockStyle}
                 onClick={() => focusEditor()}>
                <Editor editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        ref={editor}
                        blockRendererFn={mediaBlockRenderer}
                />
            </div>
        </div>
    )
}

export default TestTextEditorHooks;




// const src = window.prompt("Paste Image Link");
// <button className="" onClick={onAddImage}>
//     <i className=""
//        style={{
//            fontSize: "16px",
//            textAlign: "center",
//            padding: "0px",
//            margin: "0px"
//        }}
//     >image</i>
// </button>

// function imgchange(f) {
//     var filePath = $('#file').val();
//     var reader = new FileReader();
//     reader.onload = function (e) {
//         $('#imgs').attr('src',e.target.result);
//     };
//     reader.readAsDataURL(f.files[0]);
// }

// <input type={'file'}
//        onChange={(e) => {
//            if (e.target.files.length) {
//                onAddImage(URL.createObjectURL(e.target.files[0]))
//            }
//        }}
// />