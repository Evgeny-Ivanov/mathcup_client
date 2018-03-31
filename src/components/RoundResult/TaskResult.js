import React, { Component, Fragment } from 'react';
import { Icon, Item } from 'semantic-ui-react';
import RawDraftReader from '../RawDraftReader';
import './TaskResult.css';

class TaskResult extends Component {
  getAnswer() {
    const { task, answers } = this.props;
    for (const answer of answers) {
      if (answer.task === task.id) {
        return answer;
      }
    }

    return null;
  }

  formatTaskIndex = i => (i + 1 < 10 ? `0${i + 1}` : i + 1);

  render() {
    const { task, index } = this.props;
    const answer = this.getAnswer();

    let icon = <Icon color='green' name='check' />;
    if (!answer || !answer.correct) {
      icon = <Icon color='red' name='remove' />;
    }

    return (
      <Fragment>
        <Item>
          <Item.Content>
            <Item.Header>Задача № {this.formatTaskIndex(index)} {icon}</Item.Header>
            <Item.Description>
              <RawDraftReader content={task.text} />
              <div className='task-result__answer'>
                <p>
                  {do{
                    if (answer) <span>Ваш ответ: {answer.answer}</span>;
                    else <span>Вы не отвечали на этот вопрос</span>;
                  }}
                </p>
                <p>Правильный ответ: {task.answer}</p>
              </div>
            </Item.Description>
          </Item.Content>
        </Item>
      </Fragment>
    );
  }
}

export default TaskResult;
