import React, { Component } from 'react';
import { observer } from '../../../src/core';

@observer
class TaskInput extends Component {
  render() {
    const { label, buttonText, task, onSubmit } = this.props;
    return (
      <div>
        {label}
        <input
          type={'text'}
          value={task.title}
          onChange={event => {
            task.title = event.target.value;
          }}
        />
        <button onClick={onSubmit}>{buttonText}</button>
      </div>
    );
  }
}

export default TaskInput;
