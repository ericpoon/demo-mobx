import React, { Component } from 'react';
import { observer } from '../../../src/core';
import TaskItemComponent from './TaskItem';
import TaskInput from './TaskInput';
import Task from '../models/Task';

@observer
class TaskList extends Component {
  state = {
    editingIdx: -1,
  };

  observableTask = new Task();

  onTaskEditClick = (task, idx) => {
    this.observableTask.title = task.title;
    this.setState({ editingIdx: idx });
  };

  onTaskDeleteClick = (idx) => {
    if (idx === this.state.editingIdx) {
      this.setState({ editingIdx: -1 });
      this.observableTask.title = '';
    }
    this.props.tasks.list.remove(idx);
  };

  renderInputComponent = () => {
    const { editingIdx } = this.state;
    const { list } = this.props.tasks;
    const isEditing = editingIdx >= 0;
    let label, buttonText, onSubmit;

    if (isEditing) {
      label = 'Edit task: ';
      buttonText = 'Save';
      onSubmit = () => {
        list[editingIdx].title = this.observableTask.title;
        this.setState({ editingIdx: -1 });
        this.observableTask.title = '';
      };
    } else {
      label = 'New task: ';
      buttonText = 'Add';
      onSubmit = () => {
        list.push(new Task(this.observableTask.title, false));
        this.observableTask.title = '';
      };
    }

    return (
      <TaskInput
        label={label}
        buttonText={buttonText}
        task={this.observableTask}
        onSubmit={onSubmit}
      />
    );
  };

  renderTaskItems = () => {
    const list = [...this.props.tasks.list]; // safe copy to avoid index issue due to deletion
    return list.map((task, idx) => {
      return (
        <div key={task.title}>
          <TaskItemComponent
            task={task}
            onEditClick={() => this.onTaskEditClick(task, idx)}
            onDeleteClick={() => this.onTaskDeleteClick(idx)}
          />
        </div>
      );
    });
  };

  render() {
    const { finished, unfinished } = this.props.tasks;

    return (
      <div>
        <h2>Task List (Advanced)</h2>
        <p>Summary: {finished.length} completed and {unfinished.length} to be done.</p>
        {this.renderTaskItems()}
        {this.renderInputComponent()}
      </div>
    );
  }
}

export default TaskList;
