import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import agent from '../../agent';
import './Editor.css';

class CustomEditor extends Component {
  static convertToRaw(editorState) {
    const content = editorState.getCurrentContent();
    return convertToRaw(content);
  }

  static createEmptyEditorState() {
    return EditorState.createEmpty();
  }

  handleEditorStateChange = (editorState) => {
    this.props.onChange(editorState);
  };

  uploadCallback = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return agent.Helpers.uploadImage(formData);
  };

  render() {
    const { editorState } = this.props;
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

CustomEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
};

export default CustomEditor;
