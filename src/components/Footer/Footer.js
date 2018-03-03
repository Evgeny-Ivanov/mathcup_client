import React from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import './Footer.css';

const Footer = () => (
  <Segment inverted vertical className='footer_padding'>
    <Container>
      <Grid divided inverted stackable container>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Исходный код' />
            <List link inverted>
              <List.Item as='a' href='https://github.com/Evgeny-Ivanov'>
                Сервер
              </List.Item>
              <List.Item as='a' href='https://github.com/Evgeny-Ivanov'>
                Клиент
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width={4}>
            <Header inverted as='h4' content='Контакты' />
            <List link inverted>
              <List.Item as='a' href='https://park.mail.ru/profile/e.ivanov/'>
                Профиль на портале технопарка
              </List.Item>
              <p>
                Почта:{' '}
                <List.Item as='a' href='mailto:Saboteuur@yandex.ru'>
                  Saboteuur@yandex.ru
                </List.Item>
              </p>
            </List>
          </Grid.Column>

          <Grid.Column width={7}>
            <Header as='h4' inverted>О сайте</Header>
            <p>Портал создан как тестовое задание на позицию FullStack разработчика, и автор очень надеется, что его возьмут.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
