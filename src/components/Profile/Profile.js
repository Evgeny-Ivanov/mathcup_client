import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Header, Image } from 'semantic-ui-react';
import CropperModal from './CropperModal';
import ProfileForm from './ProfileForm';
import './Profile.css';

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
              <Image src={user.avatar} bordered rounded className='profile-image' />
            </div>
          </Grid.Column>

          <Grid.Column width={12}>
            <Header as='h2'>
              {user.firstName} {user.lastName}
              <Header.Subheader>
                {user.email}
              </Header.Subheader>
            </Header>
            <ProfileForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Profile;
