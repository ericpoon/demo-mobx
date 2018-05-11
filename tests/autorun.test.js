import Invoice from '../tests/fixture/Invoice';
import Person from '../tests/fixture/Person';
import { autorun } from '../src/core';

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

describe('subscribes and unsubscribes correctly', () => {
  let mock;
  beforeEach(() => {
    mock = jest.fn();
  });

  it('only subscribes for properties it accesses at run time', () => {
    const michael = new Person('Michael', 'Reilly', 'Mick');

    autorun(() => {
      if (michael.nickName) {
        mock(michael.nickName);
      } else {
        mock(michael.fullName);
      }
    });
    expect(mock).toHaveBeenLastCalledWith('Mick');

    michael.nickName = null;
    expect(mock).toHaveBeenLastCalledWith('Michael Reilly');

    michael.nickName = 'Micky';
    expect(mock).toHaveBeenLastCalledWith('Micky');

    michael.nickName = null;
    expect(mock).toHaveBeenLastCalledWith('Michael Reilly');

    michael.lastName = 'Torres';
    expect(mock).toHaveBeenLastCalledWith('Michael Torres');

    michael.nickName = 'Micky';
    expect(mock).toHaveBeenLastCalledWith('Micky');
    expect(mock).toHaveBeenCalledTimes(6);

    michael.lastName = 'Torres'; // does not trigger, no over-subscription
    expect(mock).toHaveBeenCalledTimes(6);

  });
});
