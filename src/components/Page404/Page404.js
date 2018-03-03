import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './Page404.css';

const Page404 = () => (
  <Header
    as='h3'
    icon
    textAlign='center'
    className='page404_margin'
  >
    <Icon name='warning sign' />
    <Header.Content>
      404
    </Header.Content>
    <Header.Subheader>
      Такой страницы не существует
    </Header.Subheader>
  </Header>
);

export default Page404;
