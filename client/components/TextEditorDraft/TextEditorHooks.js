import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Editor,
    EditorState,
    AtomicBlockUtils,
    RichUtils,
    getDefaultKeyBinding,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import './TextEditor.css'
import classes from './TextEditor.module.css'
import path from 'path'
import {savePhotoThC, SendPhotoStatusChangeToFalse, setStatusUpdate} from "../../redux/reducers/textEditorReducer";
import {writeTourContentAC} from "../../redux/reducers/toursReducer";

const __dirname = path.resolve(); //for ES6


const TextEditorHooks = (props) => {
    const dispatch = useDispatch();
    const statusUpload = useSelector(state => state.editor.statusUpload);
    const updateStatus = useSelector(state => state.editor.updateStatus);
    const getContentForUpdate = useSelector(state => state.tours.tourContent);

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    const editor = useRef(null);
    const focusEditor = () => {
        editor.current.focus()
    };

    const contentStateToExport = editorState.getCurrentContent();
    const contentToSave = JSON.stringify(convertToRaw(contentStateToExport));
    //callback onData to give data to parent (CreateTours) for save in DB. useEffect for to fix warning without []
    useEffect(() => {
        dispatch(writeTourContentAC(contentToSave))
        // props.onData(contentToSave);
    }, [editorState]);

    //for update Post
    useEffect(() => {
        if (updateStatus) {
            const contentDraft = convertFromRaw(JSON.parse(getContentForUpdate));
            setEditorState(EditorState.createWithContent(contentDraft))
        }
    }, [updateStatus]);

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


    const toggleBlockType = (blockType) => {
        setEditorState(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }

    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className={classes.wrapperEditor}>
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <label
                className={classes.label}
                htmlFor="Upload_img">
                Upload and attach
                <input className={classes.uploadImg}
                       id={'Upload_img'}
                       type={'file'}
                       onChange={(e) => {
                           if (e.target.files.length) {
                               new Promise((resolve, reject) => {
                                   dispatch(savePhotoThC(e.target.files[0]))
                                   resolve(statusUpload)
                               }).then((statusUpload) => {
                                   // if (statusUpload) {
                                   onAddImage(path.join(__dirname, '/client/uploaded/' + e.target.files[0].name)) &&
                                   SendPhotoStatusChangeToFalse()
                                   // }
                               })
                               // URL.createObjectURL(e.target.files[0])
                           }
                       }}
                />
            </label>

            <label
                className={classes.label}
                htmlFor="attach_img">
                Choose from gallery
                <input className={classes.uploadImg}
                       id={'attach_img'}
                       type={'file'}
                       onChange={(e) => {

                       }}
                />
            </label>

            <div className={classes.EditorBlockStyle}
                 onClick={() => focusEditor()}>
                <Editor editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        ref={editor}
                        blockRendererFn={mediaBlockRenderer}

                    //add from old Text Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        placeholder="Write text..."

                    // for fix bug some keyboard android
                        autoCapitalize={'none'}
                        autoComplete={'off'}
                        autoCorrect={'off'}
                        spellCheck={false}
                />
            </div>
        </div>
    )
}

export default TextEditorHooks;


// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

let INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};