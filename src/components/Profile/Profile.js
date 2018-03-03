import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Header, Image, Tab } from 'semantic-ui-react';
import CropperModal from './CropperModal';
import './Profile.css';
import ProfileForm from './ProfileForm';
import Events from './Events';
import Achievements from './Achievements';

const panes = [
  { menuItem: 'Достижения', render: Achievements },
  { menuItem: 'Последнии события', render: Events },
  { menuItem: 'Редактировать профиль', render: () => <ProfileForm /> },
];

@inject('userStore')
@observer
class Profile extends Component {
  render() {
    const { user } = this.props.userStore;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <div className='profile-image-wrapper'>
              <CropperModal />
              <Image src={user.avatar} bordered rounded className='profile-image'/>
            </div>
          </Grid.Column>

          <Grid.Column width={12}>
            <Header as='h2'>
              {user.firstName} {user.lastName}
              <Header.Subheader>
                {user.email}
              </Header.Subheader>
            </Header>
            <Tab menu={{ pointing: true, secondary: true }} panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Profile;
