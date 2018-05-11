import { autorun } from '../src/core';
import TaskList from '../tests/fixture/TaskList';

console.log('\n//////////////////////////////////////////////////////\n');

const taskList = new TaskList();

taskList.tasks.push({ title: 'pick up laundry' });
taskList.tasks.push({ title: 'take medicine' });
taskList.tasks.push({ title: 'go to supermarket' });

autorun(() => {
  console.log('[autorun] finished tasks =', taskList.finishedTasks);
});

taskList.tasks[1].done = true;
