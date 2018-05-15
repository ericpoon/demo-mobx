import TaskList from '../tests/fixture/TaskList';
import autorun from './core/autorun';

const taskList = new TaskList();

console.log('\n//////////////////////////////////////////////////////\n');

taskList.tasks.push({ title: 'pick up laundry', done: false });
taskList.tasks.push({ title: 'take medicine', done: false });
taskList.tasks.push({ title: 'go to supermarket', done: true });

autorun(() => {
  // observing computed value
  console.log('[autorun] finished tasks =', Array.from(taskList.finishedTasks));
});

taskList.tasks[1].done = true;
taskList.tasks.push({ title: 'go swimming', done: true });
taskList.tasks[2].done = false;

console.log('\n//////////////////////////////////////////////////////\n');
