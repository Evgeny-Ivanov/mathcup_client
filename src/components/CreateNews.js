import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Card, Form } from 'semantic-ui-react';
import Editor from './Editor';

@inject('newsStore')
@observer
class CreateNews extends Component {
  state = {
    header: '',
    content: {},
  };

  handleContentChange = (content) => {
    this.setState({ content });
  };

  handleCreateNews = (event) => {
    event.preventDefault();

    const { header, content } = this.state;
    this.props.newsStore.createNews({ header, content });
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { header } = this.state;

    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Заголовок</label>
              <Form.Input
                onChange={this.handleChange}
                name='header'
                value={header}
              />
            </Form.Field>
            <Form.Field>
              <label>Текст</label>
              <Editor onChange={this.handleContentChange} />
            </Form.Field>
            <Form.Field>
              <Button
                type='submit'
                onClick={this.handleCreateNews}
              >
                Создать
              </Button>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default CreateNews;
