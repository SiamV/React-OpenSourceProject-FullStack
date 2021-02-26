import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Editor, EditorState, AtomicBlockUtils, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import './TextEditor.css'
import classes from './TextEditor.module.css'
import {getSrcImageFromServer, savePhotoThC, SendTourStatusOkAC} from "../../redux/reducers/toursReducer";
import path from 'path'
import * as axios from "axios";

const __dirname = path.resolve(); //for ES6

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
    // console.log(contentToSave)

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
            {src: src} //url если брать из стейта, src если указать путь с компа
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
                           let promise = new Promise((resolve, reject) => {

                               const formData = new FormData();
                               formData.append('image', e.target.files[0])
                               try {
                                   let response = axios.post(`/api/v1/add/photo`, formData, {
                                       headers: {
                                           'Content-Type': 'multipart/form-data'
                                       }
                                   })
                                       resolve(response)

                               } catch (e) {
                               }

                           }).then((response) => {
                               if (response.request.status === 200){
                                   onAddImage(path.join(__dirname, '/client/uploaded/' + e.target.files[0].name))
                               }
                           })
                           // dispatch(savePhotoThC(e.target.files[0])) &&
                           // onAddImage(path.join(__dirname, '/client/uploaded/' + e.target.files[0].name))

                           // URL.createObjectURL(e.target.files[0])
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
            {/*<input type={'file'}*/}
            {/*       multiple={true}*/}
            {/*       accept={".png, .jpg, .jpeg"}*/}
            {/*       onChange={(e)=> {*/}
            {/*    console.log(e.target.files)*/}
            {/*    // let objectURL = URL.createObjectURL(urls)*/}
            {/*    // onAddImage(objectURL)*/}
            {/*}} />*/}
            {/*<img id="target"*/}
            {/*     src={urls[1]}*/}
            {/*     alt={'files'}*/}
            {/*     style={{width:'300px'}}*/}
            {/*/>*/}


            {/*<button onClick={()=>{dispatch(getSrcImageFromServer())}}>set img</button>*/}


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