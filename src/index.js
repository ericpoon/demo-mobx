import TaskList from '../tests/fixture/TaskList';
import autorun from './core/autorun';
const taskList = new TaskList();

console.log('\n//////////////////////////////////////////////////////\n');

taskList.tasks.push({ title: 'pick up laundry' });
taskList.tasks.push({ title: 'take medicine' });
taskList.tasks.push({ title: 'go to supermarket' });

autorun(() => {
  // todo: it does not support one level deep observation at the moment
  console.log('[autorun] finished tasks =', taskList.finishedTasks.map(i => i.title));
});

console.log(taskList.tasks[1]);

taskList.tasks[1].done = true;

console.log(taskList.tasks[1]);

console.log('\n//////////////////////////////////////////////////////\n');
