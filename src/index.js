import Invoice from './Invoice';
import TaskList from './TaskList';
import Person from './Person';
import autorun from './core/autorun';

const invoice = new Invoice();

autorun(() => {
  console.log('[autorun] price =', invoice.price);
});

autorun(() => {
  console.log('[autorun] total =', invoice.total);
});

autorun(() => {
  console.log('[autorun] discount =', invoice.discountPrice);
});

invoice.price = 100;
invoice.price = 30;
invoice.amount = 2;

console.log('\n//////////////////////////////////////////////////////\n');

const taskList = new TaskList();

taskList.tasks.push({ title: 'pick up laundry' });
taskList.tasks.push({ title: 'take medicine' });
taskList.tasks.push({ title: 'go to supermarket' });

autorun(() => {
  console.log('[autorun] finished tasks =', taskList.finishedTasks);
});

taskList.tasks[1].done = true;

console.log('\n//////////////////////////////////////////////////////\n');

const michael = new Person('Michael', 'Reilly', 'Mick');

autorun(() => {
  console.log('[autorun] Person name changed');
  if (michael.nickName) {
    console.log('>> Hello,', michael.nickName);
  } else {
    console.log('>> Hello,', michael.fullName);
  }
});

michael.nickName = null;
michael.nickName = 'Micky';

michael.nickName = null;
michael.lastName = 'Torres';

michael.nickName = 'Mick';
michael.lastName = 'Torres'; // fixme: should not trigger re-render
