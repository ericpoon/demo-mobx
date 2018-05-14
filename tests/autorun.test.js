import Invoice from '../tests/fixture/Invoice';
import Person from '../tests/fixture/Person';
import TaskList from '../tests/fixture/TaskList';
import { autorun } from '../src/core';

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
  it('only subscribes for properties it accesses at run time - triggered by mutation', () => {

  });
});

describe('autorun gets triggered properly', () => {
  describe('autorun works for primitive values', () => {
    describe('runs correctly', () => {
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

    it('triggered when re-assign', () => {
      autorun(() => mockFn(taskList.tasks));
      expect(mockFn).toHaveBeenCalledTimes(1);
      taskList.tasks = [];
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
});
