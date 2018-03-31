import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Form } from 'semantic-ui-react';
import Editor from '../Editor';

@inject('createNewsStore')
@observer
class CreateNews extends Component {
  componentWillUnmount() {
    this.props.createNewsStore.reset();
  }

  handleContentChange = (content) => {
    this.props.createNewsStore.data.content = content;
  };

  handleCreateNews = (event) => {
    event.preventDefault();
    this.props.createNewsStore.createNews();
  };

  handleChange = (event, { name, value }) => {
    this.props.createNewsStore.data[name] = value;
  };

  render() {
    const { isLoading, isSuccess, data } = this.props.createNewsStore;

    if (isSuccess) {
      return <Redirect to='/news' />;
    }

    return (
      <Card fluid>
        <Card.Content>
          <Form onSubmit={this.handleCreateNews}>
            <Form.Field>
              <label>Заголовок</label>
              <Form.Input
                required
                name='header'
                value={data.header}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Текст</label>
              <Editor onChange={this.handleContentChange} editorState={data.content} />
            </Form.Field>
            <Button type='submit' loading={isLoading} floated='right'>
              Создать
            </Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default CreateNews;
