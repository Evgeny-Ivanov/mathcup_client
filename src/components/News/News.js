import React, { Component } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Divider, Item } from 'semantic-ui-react';
import Loader from '../Loader';
import Page404 from '../Page404';
import RawDraftReader from '../RawDraftReader';

@inject('newsStore')
@observer
class News extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.newsStore.fetchNews(id);
  }

  render() {
    const { news, fetchState } = this.props.newsStore;

    if (fetchState.notFound) {
      return <Page404 />;
    }

    if (!news || fetchState.isLoading) {
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
