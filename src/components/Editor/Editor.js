import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import agent from '../../agent';

class ContentEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  handleEditorStateChange = (editorState) => {
    this.setState({ editorState });

    // TODO - нужно преобразовать в вид для хранения в базе
    this.props.onChange(editorState);
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
