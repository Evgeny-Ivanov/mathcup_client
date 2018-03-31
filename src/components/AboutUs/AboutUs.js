import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import './AboutUs.css';

const AboutUs = ({ history }) => (
  <Fragment>
    <Segment vertical className='about-us-first-block'>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h1'>Об олимпиаде</Header>
            <Image
              size='large'
              src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'
            />

            <Header as='h1'>Организаторы</Header>
            <Image
              size='large'
              src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'
            />
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image
              bordered
              rounded
              size='large'
              src='https://react.semantic-ui.com/assets/images/wireframe/image.png'
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge' onClick={() => history.push('/tournaments/')}>
              Участвовать
              <Icon name='right arrow' />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment className='about-us-second-block' vertical>
      <Container text>
        <Header as='h1'>История и описание</Header>
        <Image
          size='huge'
          src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'
        />
      </Container>
    </Segment>
  </Fragment>
);

export default withRouter(AboutUs);
