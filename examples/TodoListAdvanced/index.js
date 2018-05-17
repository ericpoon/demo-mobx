import React from 'react';
import ReactDom from 'react-dom';
import Task from './models/Task';
import TaskList from './models/TaskList';
import Main from './components/Main';

const tasks = new TaskList();
const taskA = new Task('Pick up laundry', true);
const taskB = new Task('Go to supermarket', true);
const taskC = new Task('Take medicine', false);
const taskD = new Task('Housekeeping', false);
const taskE = new Task('Appointment with clients', false);

tasks.list.push(taskA);
tasks.list.push(taskB);
tasks.list.push(taskC);
tasks.list.push(taskD);
tasks.list.push(taskE);

const app = document.getElementById('todo-list-advanced-app');
if (app) ReactDom.render(<Main tasks={tasks} />, app);
