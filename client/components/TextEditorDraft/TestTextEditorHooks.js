import React, {useEffect, useRef} from 'react';
import {Editor, EditorState, AtomicBlockUtils, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import './TextEditor.css'
import classes from './TextEditor.module.css'
import {savePhotoThC} from "../../redux/reducers/toursReducer";

const TestTextEditorHooks = () => {
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
    console.log(contentState)
    console.log(contentToSave)

    // uploadCallback2 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const data = new FormData();
    //         data.append("storyImage", file)
    //         axios.post(Upload file API call, data).then(responseImage => {
    //             resolve({ data: { link: PATH TO IMAGE ON SERVER } });
    //         })
    //     });
    // }

    // функция принимает параметр file = e.target.files[0], т.е. фото
    // const uploadCallback1 = (file) => {
    //     console.log(file)
    //     //функция uploadCallback1 на выходе вернет вот эту какашку:
    //     return new Promise(
    //         (resolve, reject) => {
    //             if (file) {
    //                 let reader = new FileReader();
    //                 reader.readAsDataURL(file);
    //                 reader.onload = function () {
    //                     console.log(reader.result);
    //                 };
    //                 reader.onerror = function (error) {
    //                     console.log('Error: ', error);
    //                 };
    //             }
    //         }
    //     );
    // }
    // callbacks:
    // const uploadCallback = (file) => {
    //     return new Promise(
    //         (resolve, reject) => {
    //             if (file) {
    //                 let reader = new FileReader();
    //                 reader.onload = (e) => {
    //                     resolve({ data: { link: e.target.result } })
    //                 };
    //                 reader.readAsDataURL(file);
    //             }
    //         }
    //     );
    // }
    //uploadCallback = (file) => {
    //     return new Promise((resolve, reject) => {
    //        const data = new FormData();
    //        data.append("storyImage", file)
    //        axios.post(Upload file API call, data).then(responseImage => {
    //             resolve({ data: { link: PATH TO IMAGE ON SERVER } });
    //        })
    //     });
    // }

    // function previewFile() {
    //     let preview = document.querySelector('img');
    //     let file    = document.querySelector('input[type=file]').files[0];
    //     let reader  = new FileReader();
    //
    //     reader.onloadend = function () {
    //         preview.src = reader.result;
    //     }
    //
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     } else {
    //         preview.src = "";
    //     }
    // }


    // function readFichier(e) {
    //     if(window.FileReader) {
    //         let file  = e.target.files[0];
    //         let reader = new FileReader();
    //         if (file && file.type.match('image.*')) {
    //             reader.readAsDataURL(file);
    //         } else {
    //             img.css('display', 'none');
    //             img.attr('src', '');
    //         }
    //         reader.onloadend = function (e) {
    //             img.attr('src', reader.result);
    //             img.css('display', 'block');
    //         }
    //     }
    // }


    // const handlePastedFiles = ( files) => {
    //     const formData = new FormData();
    //     formData.append('file',files[0])
    //     fetch('/api/uploads',
    //         {method: 'POST', body: formData})
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.file) {
    //                 setEditorState(insertImage(data.file)) //created below
    //             }
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const uploadCallback1 = (file) => {
        console.log(file)
        if (file) {
            setEditorState(insertImage('https://cemillatours.com/wp-content/uploads/2013/08/026caf5516f4974a8494661eee6184f7.jpg'))
        }

    }

    const insertImage = (url) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            {src: url},)
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity});
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '');
    };

    return (
        <div>
            <div>Hello Editor!</div>
            <input placeholder={'Attach images'}
                   type={'file'}
                   onChange={(e) => {
                       if (e.target.files.length) {
                           uploadCallback1(e.target.files[0])
                       }
                   }}
            />
            <div className={classes.EditorBlockStyle}
                 onClick={() => focusEditor()}>
                <Editor editorState={editorState}
                        onChange={setEditorState}
                        handlePastedFiles={uploadCallback1}
                        ref={editor}
                    // toolbar={{
                    //     options: ['image',],
                    //     image: {
                    //         uploadEnabled: true,
                    //         uploadCallback: uploadCallback1,
                    //         previewImage: true,
                    //         inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    //         alt: {present: false, mandatory: false},
                    //         defaultSize: {
                    //             height: 'auto',
                    //             width: 'auto',
                    //         },
                    //     },
                    // }}
                />
            </div>
        </div>
    )
}

export default TestTextEditorHooks;