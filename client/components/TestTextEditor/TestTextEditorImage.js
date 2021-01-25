import React from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import './TextEditor2.css'
import classes from './TextEditor.module.css'
import {savePhotoThC} from "../../redux/reducers/toursReducer";

const TestTextEditorImage = () => {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );

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
    const uploadCallback1 = (file) => {
        console.log(file)
        //функция uploadCallback1 на выходе вернет вот эту какашку:
        return new Promise(
            (resolve, reject) => {
                if (file) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        console.log(reader.result);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                }
            }
        );
    }
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
            <div className={classes.EditorBlockStyle}>
                <Editor editorState={editorState}
                        onChange={setEditorState}
                        toolbar={{
                            options: ['image',],
                            image: {
                                uploadEnabled: true,
                                uploadCallback: uploadCallback1,
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: {present: false, mandatory: false},
                                defaultSize: {
                                    height: 'auto',
                                    width: 'auto',
                                },
                            },
                        }}
                />
            </div>
        </div>
    )
}

export default TestTextEditorImage;