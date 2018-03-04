import React, { Component, Fragment } from 'react';
import { Header, Icon, Item, Pagination } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import Loader from '../Loader';
import NewsListItem from './NewsListItem';
import './NewsList.css';

@inject('newsStore')
@observer
class NewsList extends Component {
  componentDidMount() {
    const firstPage = 1;
    this.props.newsStore.fetchNewsList(firstPage);
  }

  handlePaginationChange = async (event, { activePage }) => {
    await this.props.newsStore.fetchNewsList(activePage);
    window.scrollTo(0, 0);
  };

  render() {
    const {
      newsList, fetchState, activePage, totalPages,
    } = this.props.newsStore;

    if (fetchState.isLoading) {
      return <Loader />;
    }

    if (!newsList.length) {
      return (
        <Header as='h3' icon textAlign='center'>
          <Icon name='frown' />
          Пусто
          <Header.Subheader>
            Ни одной новости еще нет.
          </Header.Subheader>
        </Header>
      );
    }

    return (
      <Fragment>
        <Item.Group divided>
          {newsList.map(props => <NewsListItem key={props.id} {...props} />)}
        </Item.Group>
        <div className='news-list-pagination-wrapper'>
          <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
          />
        </div>
      </Fragment>
    );
  }
}

export default NewsList;
