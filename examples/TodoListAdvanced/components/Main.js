import React, { Component } from 'react';
import { autorun } from '../../../src/core';
import TaskItemComponent from './TaskItem';
import Task from '../../TodoList/models/Task';

export default class Main extends Component {
  componentDidMount() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }

  state = {
    editingIdx: -1,
  };

  onTaskEditClick = (task, idx) => {
    this.taskTitleInput.value = task.title;
    this.setState({ editingIdx: idx });
  };

  onTaskDeleteClick = (task, idx) => {
    if (idx === this.state.editingIdx) {
      this.setState({ editingIdx: -1 });
      this.taskTitleInput.value = '';
    }
    this.props.tasks.list.remove(idx);
  };

  render() {
    const { tasks } = this.props;
    const { finished, unfinished } = tasks;
    const list = [...tasks.list]; // safe copy to avoid index issue due to deletion
    const { editingIdx } = this.state;

    return (
      <div>
        <h2>Task List (Advanced)</h2>
        <p>Summary: {finished.length} completed and {unfinished.length} to be done.</p>
        {list.map((task, idx) => {
          return (
            <div key={task.title}>
              <TaskItemComponent
                task={task}
                onEditClick={() => this.onTaskEditClick(task, idx)}
                onDeleteClick={() => this.onTaskDeleteClick(idx)}
              />
            </div>
          );
        })}
        <div>
          {editingIdx >= 0 ? 'Edit task:' : 'New task:'}
          <input type={'text'} ref={ref => this.taskTitleInput = ref} />
          <button
            onClick={() => {
              if (editingIdx >= 0) {
                tasks.list[editingIdx].title = this.taskTitleInput.value;
                this.setState({ editingIdx: -1 });
                this.taskTitleInput.value = '';
              } else {
                tasks.list.push(new Task(this.taskTitleInput.value, false));
                this.taskTitleInput.value = '';
              }
            }}
          >
            {editingIdx >= 0 ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    );
  }
}
