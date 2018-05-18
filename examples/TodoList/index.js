import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observer } from '../../src/core';
import Task from './models/Task';
import TaskList from './models/TaskList';

@observer
class Main extends Component {
  taskItem = (task) => {
    const { title, done } = task;
    const onTaskClick = () => task.done = !task.done;
    return (
      <div>
        <label style={{ color: done ? 'green' : 'red', fontSize: 20, lineHeight: 2 }}>
          <input type={'checkbox'} checked={done} onClick={onTaskClick} />
          {title}
        </label>
      </div>
    );
  };

  render() {
    const { tasks } = this.props;
    const { finished, unfinished } = tasks;

    return (
      <div>
        <h2>Task List</h2>
        <p>Summary: {finished.length} completed and {unfinished.length} to be done.</p>
        {tasks.list.map(task => {
          return <div key={task.title}>{this.taskItem(task)}</div>;
        })}
      </div>
    );
  }
}

const tasks = new TaskList();
const taskA = new Task('Pick up laundry', false);
const taskB = new Task('Go to supermarket', false);
const taskC = new Task('Take medicine', false);
const taskD = new Task('Housekeeping', false);
const taskE = new Task('Appointment with clients', false);

tasks.list.push(taskA);
tasks.list.push(taskB);
tasks.list.push(taskC);
tasks.list.push(taskD);
tasks.list.push(taskE);

const app = document.getElementById('todo-list-app');
if (app) ReactDom.render(<Main tasks={tasks} />, app);
