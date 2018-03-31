import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Header, Image, Table } from 'semantic-ui-react';
import medal1 from './medals/medal-1.svg';
import medal2 from './medals/medal-2.svg';
import medal3 from './medals/medal-3.svg';

@inject('userStore')
@observer
class UserResult extends Component {
  render() {
    const { user: currentUser } = this.props.userStore;
    const { place, user, score } = this.props;

    return (
      <Table.Row warning={currentUser && currentUser.id === user.id}>
        <Table.Cell width={2}>
          {do {
            if (place === 1) <Image src={medal1} size='mini' />;
            else if (place === 2) <Image src={medal2} size='mini' />;
            else if (place === 3) <Image src={medal3} size='mini' />;
            else <span className='round-rating__place'>{place}</span>;
          }}
        </Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={user.avatar} rounded size='mini' />
            <Header.Content>
              {user.firstName} {user.lastName}
              <Header.Subheader>{user.email}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{score}</Table.Cell>
      </Table.Row>
    );
  }
}

export default UserResult;
