import React, { Component } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';
import { Divider, Item } from 'semantic-ui-react';
import Loader from '../Loader';
import RawDraftReader from '../RawDraftReader';

@inject('newsStore')
@withRouter
@observer
class News extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.newsStore.fetchNews(id);
  }

  componentWillUnmount() {
    this.props.newsStore.reset();
  }

  render() {
    const { isNotFound, news } = this.props.newsStore;

    if (isNotFound) {
      return <Redirect to='/404' />;
    }

    if (!news) {
      return <Loader />;
    }

    const { header, content, date } = news;

    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{header}</Item.Header>
            <Divider />
            <Item.Description>
              <RawDraftReader content={content} />
            </Item.Description>
            <Divider />
            <Item.Extra>Опубликовано {moment(date).fromNow()}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default News;
