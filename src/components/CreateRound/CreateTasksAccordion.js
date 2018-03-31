import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Accordion, Button, Icon, Popup } from 'semantic-ui-react';
import CreateTask from './CreateTask';
import './CreateTasksAccordion.css';

@inject('createRoundStore')
@observer
class CreateTasksAccordion extends Component {
  handleSetActiveTaskIndex = (event, { index }) => {
    this.props.createRoundStore.setActiveTaskIndex(index);
  };

  handleAddTask = () => {
    const { tasks } = this.props.createRoundStore.data;
    this.props.createRoundStore.addTask();
    this.props.createRoundStore.setActiveTaskIndex(tasks.length - 1);
  };

  handleDeleteTask = (event, index) => {
    event.stopPropagation();
    this.props.createRoundStore.deleteTask(index);
  };

  render() {
    const { data, activeTaskIndex } = this.props.createRoundStore;

    const panels = data.tasks.map((props, index) => (
      <Fragment>
        <Accordion.Title
          active={activeTaskIndex === index}
          index={index}
          onClick={this.handleSetActiveTaskIndex}
        >
          <Icon name='dropdown' />
          Задача {index + 1}
          <Icon
            name='remove'
            className='create-round__remove-task-button'
            onClick={event => this.handleDeleteTask(event, index)}
          />
        </Accordion.Title>

        <Accordion.Content active={activeTaskIndex === index}>
          <CreateTask {...props} index={index} />
        </Accordion.Content>
      </Fragment>
    ));

    return (
      <Fragment>
        <Accordion styled fluid className='create-round__accordion'>
          {panels}
        </Accordion>

        <Popup
          position='center right'
          inverted
          trigger={
            <Button
              className='create-round__add-task-button'
              type='button'
              icon
              color='grey'
              size='small'
              onClick={this.handleAddTask}
            >
              <Icon name='plus' />
            </Button>
          }
          content='Добавить задачу'
        />
      </Fragment>
    );
  }
}

export default CreateTasksAccordion;
