import Invoice from '../tests/fixture/Invoice';
import Person from '../tests/fixture/Person';
import TaskList from '../tests/fixture/TaskList';
import { autorun } from '../src/core';
import observable from '../src/core/observable';

describe('autorun subscribes and unsubscribes correctly', () => {
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
  });

  it('only subscribes for properties it accesses at run time - triggered by re-assignment', () => {
    const michael = new Person('Michael', 'Reilly', 'Mick');

    autorun(() => {
      if (michael.nickName) {
        mockFn(michael.nickName);
      } else {
        mockFn(michael.fullName);
      }
    });
    expect(mockFn).toHaveBeenLastCalledWith('Mick');

    michael.nickName = null;
    expect(mockFn).toHaveBeenLastCalledWith('Michael Reilly');

    michael.nickName = 'Micky';
    expect(mockFn).toHaveBeenLastCalledWith('Micky');

    michael.nickName = null;
    expect(mockFn).toHaveBeenLastCalledWith('Michael Reilly');

    michael.lastName = 'Torres';
    expect(mockFn).toHaveBeenLastCalledWith('Michael Torres');

    michael.nickName = 'Micky';
    expect(mockFn).toHaveBeenLastCalledWith('Micky');
    expect(mockFn).toHaveBeenCalledTimes(6);

    michael.lastName = 'Torres'; // does not trigger, no over-subscription
    expect(mockFn).toHaveBeenCalledTimes(6);

  });
  it('only subscribes for properties it accesses at run time - triggered by internal mutation', () => {
    class Tester {
      @observable array = [1, 2, 3, 4];

      @observable sum;

      get arraySum() {
        return Array.from(this.array).reduce((a, b) => a + b, 0);
      }
    }

    const tester = new Tester();
    autorun(() => {
      if (tester.sum) {
        mockFn(tester.sum);
      } else {
        mockFn(tester.arraySum);
      }
    });
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith(1 + 2 + 3 + 4);

    tester.array.push(5);
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith(1 + 2 + 3 + 4 + 5); // triggered by push

    tester.sum = 100;
    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenLastCalledWith(100);

    tester.array.push(6);
    expect(mockFn).toHaveBeenCalledTimes(3); // not triggered

  });
});

describe('autorun gets triggered properly', () => {
  describe('autorun works for primitive values', () => {
    let invoice;
    let mock;
    beforeEach(() => {
      invoice = new Invoice(10, 1);
      mock = jest.fn();
    });

    it('runs once with initial property value', () => {
      autorun(() => mock(invoice.price));
      expect(mock).toHaveBeenLastCalledWith(10);
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('runs when the property it accesses changes', () => {
      mock = jest.fn();
      autorun(() => mock(invoice.price));
      expect(mock).toHaveBeenLastCalledWith(10);
      invoice.price = 100;
      expect(mock).toHaveBeenLastCalledWith(100);
      invoice.price = 30;
      expect(mock).toHaveBeenLastCalledWith(30);
      expect(mock).toHaveBeenCalledTimes(3);
    });

    it('does not run when the property it access remains unchanged', () => {
      autorun(() => mock(invoice.price));
      expect(mock).toHaveBeenLastCalledWith(10);
      invoice.amount = 5;
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('works for computed value that directly accesses observable properties', () => {
      autorun(() => mock(invoice.total));
      expect(mock).toHaveBeenLastCalledWith(10);
      invoice.amount = 5;
      expect(mock).toHaveBeenLastCalledWith(50);
      invoice.price = 30;
      expect(mock).toHaveBeenLastCalledWith(150);
      expect(mock).toHaveBeenCalledTimes(3);
    });

    it('works for computed value that indirectly accesses observable properties', () => {
      autorun(() => mock(invoice.tenPercentOff));
      expect(mock).toHaveBeenLastCalledWith(9);
      invoice.amount = 5;
      expect(mock).toHaveBeenLastCalledWith(45);
      invoice.price = 30;
      expect(mock).toHaveBeenLastCalledWith(135);
      expect(mock).toHaveBeenCalledTimes(3);
    });
  });
  describe('autorun works for array', () => {
    let taskList;
    let mockFn;
    const ITEM_1 = { title: 'pick up laundry' };
    const ITEM_2 = { title: 'do schoolwork' };
    beforeEach(() => {
      taskList = new TaskList();
      mockFn = jest.fn();
    });

    function getArgInLastCall(mockFn) {
      return Array.from(mockFn.mock.calls[mockFn.mock.calls.length - 1][0]);
    }

    it('triggered when re-assign the array itself', () => {
      autorun(() => mockFn(taskList.tasks));
      expect(mockFn).toHaveBeenCalledTimes(1);
      taskList.tasks = [];
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('triggered when re-assign an item in the array', () => {
      taskList.tasks.push(ITEM_1);
      taskList.tasks.push(ITEM_2);

      autorun(() => mockFn(taskList.tasks.map(i => i)));
      expect(mockFn).toHaveBeenCalledTimes(1);
      taskList.tasks[0] = { title: 'go swimming' };
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('triggered when mutate an item in the array', () => {
      taskList.tasks.push(ITEM_1);
      taskList.tasks.push(ITEM_2);

      autorun(() => mockFn(taskList.tasks.map(i => i)));
      expect(mockFn).toHaveBeenCalledTimes(1);
      taskList.tasks[0].title = 'go swimming';
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('triggered when push', () => {
      autorun(() => mockFn(taskList.tasks));
      taskList.tasks.push(ITEM_1);

      expect(getArgInLastCall(mockFn)).toEqual([ITEM_1]);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('triggered when pop', () => {
      taskList.tasks.push(ITEM_1);
      taskList.tasks.push(ITEM_2);

      autorun(() => mockFn(taskList.tasks));
      expect(getArgInLastCall(mockFn)).toEqual([ITEM_1, ITEM_2]);

      const popped1 = taskList.tasks.pop();
      expect(popped1).toEqual(ITEM_2);
      expect(getArgInLastCall(mockFn)).toEqual([ITEM_1]);

      const popped2 = taskList.tasks.pop();
      expect(popped2).toEqual(ITEM_1);
      expect(getArgInLastCall(mockFn)).toEqual([]);

      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });
  describe('autorun works for object', () => {
    const employee = {
      id: 12345678,
      name: 'John',
      isManager: true,
      projects: ['projA', 'projB', 'projC'],
      details: {
        yearOfBirth: 1990,
        city: 'Hong Kong',
        github: 'www.github.com/demo',
      },
    };

    class Tester {
      @observable
      employee = employee;
    }

    let tester;
    let mockFn;
    beforeEach(() => {
      tester = new Tester();
      mockFn = jest.fn();
    });

    it('triggered if re-assign the object', () => {
      autorun(() => mockFn(tester.employee));
      expect(mockFn).toHaveBeenCalledTimes(1);
      const newEmployee = { id: 98760000, name: 'Mary', isManager: false };
      tester.employee = newEmployee;
      expect(mockFn).toHaveBeenLastCalledWith(newEmployee);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('triggered if re-assign a property in the object', () => {
      autorun(() => mockFn(...Object.values(tester.employee)));
      expect(mockFn).toHaveBeenCalledTimes(1);
      tester.employee.name = 'Mary';
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith(...Object.values({
        ...employee,
        name: 'Mary',
        projects: expect.anything(),
      }));
      expect(Array.from(mockFn.mock.calls[mockFn.mock.calls.length - 1][3])).toEqual(employee.projects);
    });

    it('triggered if mutate an array property in the object', () => {
      autorun(() => mockFn(...Object.values(tester.employee)));
      expect(mockFn).toHaveBeenCalledTimes(1);
      tester.employee.projects.push('projD');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith(...Object.values({
        ...employee,
        projects: expect.anything(),
      }));
      expect(Array.from(mockFn.mock.calls[mockFn.mock.calls.length - 1][3])).toEqual([...employee.projects, 'projD']);
    });

    it('triggered if mutate an object property in the object', () => {
      autorun(() => mockFn(tester.employee.details.city));
      expect(mockFn).toHaveBeenCalledTimes(1);
      tester.employee.details.city = 'London';
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith('London');
    });
  });
  describe('autorun works for computed values', () => {
    let mockFn;
    let taskList;
    beforeEach(() => {
      mockFn = jest.fn();
      taskList = new TaskList();
      taskList.tasks.push({ title: 'pick up laundry', done: false });
      taskList.tasks.push({ title: 'take medicine', done: false });
      taskList.tasks.push({ title: 'go to supermarket', done: true });
      autorun(() => mockFn(Array.from(taskList.finishedTasks)));
    });

    it('triggered when re-assign an observed property', () => {
      taskList.tasks[0] = { title: 'pick up laundry again', done: true };
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith(['pick up laundry again', 'go to supermarket']);
    });

    it('triggered when re-assign an observed property (deeper)', () => {
      taskList.tasks[0].done = true;
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith(['pick up laundry', 'go to supermarket']);
      taskList.tasks[2].done = false;
      expect(mockFn).toHaveBeenCalledTimes(3);
      expect(mockFn).toHaveBeenLastCalledWith(['pick up laundry']);
    });

    it('triggered when internally mutate an observed property', () => {
      taskList.tasks.push({ title: 'go swimming', done: true });
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith(['go to supermarket', 'go swimming']);
    });

  });
});
