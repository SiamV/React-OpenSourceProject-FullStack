import React from 'react';
import {AtomicBlockUtils, Editor, EditorState, RichUtils, convertToRaw, getDefaultKeyBinding} from 'draft-js';
import './TextEditor.css'
import classes from './TextEditor.module.css'

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();

        this.onChange = (editorState) => {
            this.setState({editorState});

            const contentState = this.state.editorState.getCurrentContent();
            const contentToSave = JSON.stringify(convertToRaw(contentState));
            //callback onData to give data to parent (PrivateAdmin) for save in DB
            this.props.onData(contentToSave);
            // console.log(contentState)
        }
        // this.logState = () => {
        //     const content = this.state.editorState.getCurrentContent();
        //     console.log(convertToRaw(content));
        // };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onAddImage = this._onAddImage.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onAddImage() {
        const editorState = this.state.editorState;
        const src = window.prompt("Paste Image Link");
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            {src: src}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );
        // console.log(convertToRaw(editorState.getCurrentContent()), convertToRaw(newEditorState.getCurrentContent()), Entity.get(entityKey));
        this.setState(
            {
                editorState: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " "
                )
            }
        );
    };

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />

                {/*<input type={'file'}*/}
                {/*       onChange={(e) => {*/}
                {/*           if (e.target.files.length) {*/}
                {/*               // dispatch(savePhotoThC(e.target.files[0])) &&*/}
                {/*               this.onAddImage(URL.createObjectURL(e.target.files[0]))*/}
                {/*           }*/}
                {/*       }}*/}
                {/*       style={{*/}
                {/*           fontSize: "16px",*/}
                {/*           textAlign: "center",*/}
                {/*           padding: "2px",*/}
                {/*           margin: "2px"*/}
                {/*       }}*/}
                {/*       placeholder={'Attach images'}*/}
                {/*/>*/}
                <button className="" onClick={this.onAddImage}>
                    <i className=""
                       style={{
                           fontSize: "16px",
                           textAlign: "center",
                           padding: "0px",
                           margin: "0px"
                       }}
                    >image</i>
                </button>

                <div className={classes.EditorBlockStyle}>
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        blockRendererFn={mediaBlockRenderer}
                        placeholder="Write text..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
                {/*<input onClick={this.logState} type="button" value="Log State" />*/}
            </div>
        );
    }
}

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
}

const Image = props => {
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
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
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

export default TextEditor;