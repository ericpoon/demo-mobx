import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { autorun } from '../../src/core/index';
import Task from './models/Task';
import TaskList from './models/TaskList';

class Main extends Component {

  componentDidMount() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }

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

    return (
      <div>
        <h2>Task List</h2>
        <p>Summary: {tasks.finished.length} completed and {tasks.unfinished.length} to be done.</p>
        {Array.from(tasks.list).map(task => {
          // fixme: should not use Array.from
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
