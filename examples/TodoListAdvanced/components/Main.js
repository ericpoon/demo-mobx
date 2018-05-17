import React, { Component } from 'react';
import { autorun } from '../../../src/core';
import TaskItemComponent from './TaskItem';
import InputComponent from './Input';
import Task from '../models/Task';
import Input from '../models/Input';

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

  inputObservable = new Input();

  onTaskEditClick = (task, idx) => {
    this.inputObservable.value = task.title;
    this.setState({ editingIdx: idx });
  };

  onTaskDeleteClick = (task, idx) => {
    if (idx === this.state.editingIdx) {
      this.setState({ editingIdx: -1 });
      this.inputObservable.value = '';
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
        <InputComponent
          label={editingIdx >= 0 ? 'Edit task:' : 'New task:'}
          buttonText={editingIdx >= 0 ? 'Save' : 'Add'}
          inputObservable={this.inputObservable}
          onSubmit={() => {
            if (editingIdx >= 0) {
              tasks.list[editingIdx].title = this.inputObservable.value;
              this.setState({ editingIdx: -1 });
              this.inputObservable.value = '';
            } else {
              tasks.list.push(new Task(this.inputObservable.value, false));
              this.inputObservable.value = '';
            }
          }}
        />
      </div>
    );
  }
}
