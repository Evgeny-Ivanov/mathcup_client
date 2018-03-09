import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Form } from 'semantic-ui-react';
import Editor from '../Editor';
import './CreateNews.css';

@inject('newsStore')
@observer
class CreateNews extends Component {
  state = {
    header: '',
    content: Editor.createEmptyEditorState(),
    isRedirect: false,
  };

  handleContentChange = (content) => {
    this.setState({ content });
  };

  handleCreateNews = async (event) => {
    event.preventDefault();

    const { header, content } = this.state;

    await this.props.newsStore.createNews({
      header,
      content: Editor.convertToRaw(content),
    });
    this.setState({ isRedirect: true });
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { header, content, isRedirect } = this.state;
    const { isLoading } = this.props.newsStore.createState;

    if (isRedirect) {
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
                value={header}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Текст</label>
              <Editor onChange={this.handleContentChange} editorState={content} />
            </Form.Field>
            <Form.Field className='create-news__submit-button-wrapper'>
              <Button type='submit' loading={isLoading}>
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
