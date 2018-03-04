import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentState, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { toJS } from 'mobx';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const getPreviewContentState = (contentState, count) => {
  let currentBlock = contentState.getFirstBlock();
  const blockArray = [currentBlock];
  for (let i = 1; i < count; i++) {
    currentBlock = contentState.getBlockAfter(currentBlock.getKey());
    if (!currentBlock) {
      break;
    }
    blockArray.push(currentBlock);
  }

  return ContentState.createFromBlockArray(blockArray);
};

class RawDraftReader extends Component {
  render() {
    const { content, blockCount } = this.props;
    let contentState = convertFromRaw(toJS(content));

    if (blockCount) {
      contentState = getPreviewContentState(contentState, blockCount);
    }

    return (
      <Editor
        editorState={EditorState.createWithContent(contentState)}
        toolbarHidden
        readOnly
      />
    );
  }
}

RawDraftReader.propTypes = {
  content: PropTypes.object.isRequired,
  blockCount: PropTypes.number,
};

export default RawDraftReader;
