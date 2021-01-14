import React from 'react'

const RichTextEditor = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'title'} component={Input} placeholder={'tour title'} /></div>
            <div><Field name={'content'} component={EditorField} placeholder={'tour text'} /></div>
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

export default RichTextEditor;