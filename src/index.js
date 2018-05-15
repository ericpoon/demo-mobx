import TaskList from '../tests/fixture/TaskList';
import autorun from './core/autorun';

const taskList = new TaskList();

console.log('\n//////////////////////////////////////////////////////\n');

taskList.tasks.push({ title: 'pick up laundry' });
taskList.tasks.push({ title: 'take medicine' });
taskList.tasks.push({ title: 'go to supermarket', done: true });

autorun(() => {
  // todo: it does not support observing computed value
  console.log('[autorun] finished tasks =', Array.from(taskList.finishedTasks));
});

console.log(taskList.tasks[1]);

taskList.tasks[1].done = true;

console.log(taskList.tasks[1]);

console.log('\n//////////////////////////////////////////////////////\n');
