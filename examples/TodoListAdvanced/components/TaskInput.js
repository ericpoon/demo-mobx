import React, { Component } from 'react';
import { autorun } from '../../../src/core';

class TaskInput extends Component {

  componentDidMount() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }

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
