import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

@inject('passRoundStore')
@observer
class TasksNavigationItem extends Component {
  setCurrentTaskIndex = (taskIndex) => {
    this.props.passRoundStore.setCurrentTaskIndex(taskIndex);
  };

  getTaskButtonColor = (index) => {
    const { currentTaskIndex, answers } = this.props.passRoundStore;

    if (index === currentTaskIndex) return 'orange';
    if (answers[index] && answers[index].isSend) return 'green';
    return null;
  };

  formatTaskIndex = i => (i + 1 < 10 ? `0${i + 1}` : i + 1);

  render() {
    const { index } = this.props;

    return (
      <Button
        className='pass-round__tasks-navigation-item'
        color={this.getTaskButtonColor(index)}
        onClick={() => this.setCurrentTaskIndex(index)}
      >
        {this.formatTaskIndex(index)}
      </Button>
    );
  }
}

export default TasksNavigationItem;
