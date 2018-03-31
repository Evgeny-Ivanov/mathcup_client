import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';

@withRouter
class Tournament extends Component {
  handleRedirect = () => {
    this.props.history.push(`/tournaments/${this.props.id}`);
  };

  render() {
    const { name, isCompleted, isPublished } = this.props;

    return (
      <Item>
        <Item.Content>
          <Item.Header as='a' onClick={this.handleRedirect}>{name}</Item.Header>
          <Item.Description>
            {isCompleted && <Label>Завершен</Label>}
            {!isPublished && <Label>Не опубликован</Label>}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

export default Tournament;
