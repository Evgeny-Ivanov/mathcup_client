import React, { Component, Fragment } from 'react';
import { Header, Icon, Item, Pagination } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import AdminMenuItems from './AdminMenuItems';
import Loader from '../Loader';
import Tournament from './Tournament';
import withAdminMenu from '../withAdminMenu';

@withAdminMenu(AdminMenuItems)
@inject('tournamentsStore')
@observer
class Tournaments extends Component {
  componentDidMount() {
    let page = 1;
    const match = this.props.location.search.match(/\?page=(\d+)$/);
    if (match) {
      page = match[1];
    }
    this.props.tournamentsStore.fetchTournaments(page);
  }

  handlePaginationChange = async (event, { activePage }) => {
    this.props.history.push(`/tournaments/?page=${activePage}`);
    await this.props.tournamentsStore.fetchTournaments(activePage);
    window.scrollTo(0, 0);
  };

  render() {
    const {
      tournaments, isLoading, activePage, totalPages, count, pageSize,
    } = this.props.tournamentsStore;

    if (isLoading) {
      return <Loader />;
    }

    if (!tournaments.length) {
      return (
        <Header as='h3' icon textAlign='center'>
          <Icon name='frown' />
          Пусто
          <Header.Subheader>
            Ни одного турнира еще нет.
          </Header.Subheader>
        </Header>
      );
    }

    return (
      <Fragment>
        <Item.Group divided>
          {tournaments.map(props => <Tournament key={props.id} {...props} />)}
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

export default Tournaments;
