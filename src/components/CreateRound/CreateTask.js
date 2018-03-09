import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Form } from 'semantic-ui-react';
import Editor from '../Editor';

@inject('createRoundStore')
@observer
class CreateTask extends Component {
  handleChange = (event, { name, value }) => {
    this.props.createRoundStore.data.tasks[this.props.index][name] = value;
  };

  handleTextChange = (text) => {
    this.props.createRoundStore.data.tasks[this.props.index].text = text;
  };

  render() {
    const { answer, text } = this.props;

    return (
      <Fragment>
        <Form.Field>
          <label>Текст</label>
          <Editor onChange={this.handleTextChange} editorState={text} />
        </Form.Field>
        <Form.Field>
          <label>Ответ</label>
          <Form.Input
            required
            name='answer'
            value={answer}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Fragment>
    );
  }
}

CreateTask.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.object.isRequired,
  answer: PropTypes.string.isRequired,
};

export default CreateTask;
