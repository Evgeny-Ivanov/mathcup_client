import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Checkbox, Form } from 'semantic-ui-react';
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

  handleChangeCheckbox = (event, { name, value }) => {
    this.props.createRoundStore.data.tasks[this.props.index][name] = value;
  };

  render() {
    const { answer, text, weight } = this.props;

    const weightFields = [];
    for (let i = 1; i <= 5; i++) {
      weightFields.push((
        <Form.Field>
          <Checkbox
            radio
            name='weight'
            label={i}
            value={i}
            checked={weight === i}
            onChange={this.handleChangeCheckbox}
          />
        </Form.Field>
      ));
    }

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
        <Form.Group inline>
          <label>Сложность вопроса</label>
          {weightFields}
        </Form.Group>
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
