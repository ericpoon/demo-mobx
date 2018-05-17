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
    editingIdx: null,
  };

  render() {
    const { tasks } = this.props;
    const { finished, unfinished } = tasks;
    const list = [...tasks.list]; // safe copy to avoid index issue due to deletion
    const { editingIdx } = this.state;

    return (
      <div>
        <h2>Task List</h2>
        <p>Summary: {finished.length} completed and {unfinished.length} to be done.</p>
        {list.map((task, idx) => {
          return (
            <div key={task.title}>
              <TaskItemComponent task={task} />
              <button
                onClick={() => {
                  this.taskTitleInput.value = task.title;
                  this.setState({ editingIdx: idx });
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (idx === editingIdx) {
                    this.setState({ editingIdx: null });
                    this.taskTitleInput.value = '';
                  }
                  tasks.list.remove(idx);
                }}
              >
                Delete
              </button>
              <hr />
            </div>
          );
        })}
        <div>
          {editingIdx ? 'Edit task:' : 'New task:'}
          <input type={'text'} ref={ref => this.taskTitleInput = ref} />
          <button
            onClick={() => {
              if (editingIdx) {
                tasks.list[editingIdx].title = this.taskTitleInput.value;
                this.setState({ editingIdx: null });
                this.taskTitleInput.value = null;
              } else {
                tasks.list.push(new Task(this.taskTitleInput.value, false));
                this.taskTitleInput.value = '';
              }
            }}
          >
            {editingIdx ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    );
  }
}
