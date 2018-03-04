import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import agent from '../../agent';
import './Editor.css';

class ContentEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  handleEditorStateChange = (editorState) => {
    this.setState({ editorState });

    const content = editorState.getCurrentContent();
    const raw = convertToRaw(content);
    this.props.onChange(raw);
  };

  uploadCallback = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return agent.Helpers.uploadImage(formData);
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.handleEditorStateChange}
        localization={{ locale: 'ru' }}
        editorClassName='editor-textarea'
        toolbarClassName='editor-toolbar'
        toolbar={{
          image: {
            previewImage: true,
            uploadCallback: this.uploadCallback,
          },
        }}
      />
    );
  }
}

export default ContentEditor;
