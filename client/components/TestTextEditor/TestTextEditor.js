import React from "react";
import { EditorState, Editor } from "draft-js";
import "draft-js/dist/Draft.css";

const TestTextEditor = () => {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
        console.log(editor)
    }

    return (
        <div
            style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
            onClick={focusEditor}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something!"
                toolbar={{
                    inline: {inDropdown: true},
                    list: {inDropdown: true},
                    textAlign: {inDropdown: true},
                    link: {inDropdown: true},
                    history: {inDropdown: true}
                }}
            />
        </div>
    );
}

export default TestTextEditor;

// class TestTextEditor extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             editorState: EditorState.createEmpty(),
//         };
//     }
//
//     onEditorStateChange: Function = (editorState) => {
//         // console.log(editorState)
//         this.setState({
//             editorState,
//         });
//     };
//
//     render(){
//         const { editorState } = this.state;
//         return <div className='editor'>
//             <Editor
//                 editorState={editorState}
//                 onEditorStateChange={this.onEditorStateChange}
//                 toolbar={{
//                     inline: { inDropdown: true },
//                     list: { inDropdown: true },
//                     textAlign: { inDropdown: true },
//                     link: { inDropdown: true },
//                     history: { inDropdown: true },
//                     image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
//                 }}
//             />
//         </div>
//     }
// }

