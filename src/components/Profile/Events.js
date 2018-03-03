import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Events = () => (
  <Header as='h3' icon textAlign='center'>
    <Icon name='frown' />
      Событий еще не было
    <Header.Subheader>
      Принимайте участие в турнирах
    </Header.Subheader>
  </Header>
);

export default Events;
