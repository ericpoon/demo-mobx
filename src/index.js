import TaskList from '../tests/fixture/TaskList';
import observable from './core/observable';
import autorun from './core/autorun';

class Tester {
  @observable
  array = ['Tommy', 'Jane', 'Roy'];

}

const tester = new Tester();

autorun(() => {
  console.log(Array.from(tester.array));
});

tester.array.push('Eric');
tester.array.pop();
tester.array.pop();

console.log('\n//////////////////////////////////////////////////////\n');

const taskList = new TaskList();

taskList.tasks.push({ title: 'pick up laundry' });
taskList.tasks.push({ title: 'take medicine' });
taskList.tasks.push({ title: 'go to supermarket' });

autorun(() => {
  // todo: it does not support one level deep observation at the moment
  console.log('[autorun] finished tasks =', taskList.finishedTasks);
});

console.log(taskList.tasks[1]);

taskList.tasks[1].done = true;

console.log(taskList.tasks[1]);
