import React, { Component, Fragment } from 'react';
import { Header, Icon, Item, Pagination } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import Loader from '../Loader';
import NewsListItem from './NewsListItem';
import AdminMenuItems from './AdminMenuItems';
import withAdminMenu from '../withAdminMenu';

@withAdminMenu(AdminMenuItems)
@inject('newsListStore')
@observer
class NewsList extends Component {
  componentDidMount() {
    let page = 1;
    const match = this.props.location.search.match(/\?page=(\d+)$/);
    if (match) {
      page = match[1];
    }
    this.props.newsListStore.fetchNewsList(page);
  }

  handlePaginationChange = async (event, { activePage }) => {
    this.props.history.push(`/news/?page=${activePage}`);
    await this.props.newsListStore.fetchNewsList(activePage);
    window.scrollTo(0, 0);
  };

  render() {
    const {
      newsList, isLoading, activePage, totalPages, count, pageSize,
    } = this.props.newsListStore;

    if (isLoading) {
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
        { count > pageSize &&
          <Pagination
            className='right floated'
            firstItem={null}
            lastItem={null}
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
          />
        }
      </Fragment>
    );
  }
}

export default NewsList;
