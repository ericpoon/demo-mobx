import ObservableObject from '../src/core/ObservableObject';
import ObservableArray from '../src/core/ObservableArray';

const employee = {
  id: 12345678,
  name: 'John',
  isManager: true,
};

const course = {
  students: ['John', 'Mary', 'Tom', 'Adam', 'Lucy'],
  instructors: ['David', 'Thomas'],
};

const department = {
  employee,
  course,
};

describe('ObservableObject constructs correctly', () => {
  it('constructs with no arg', () => {
    const observableObj = new ObservableObject().get();
    expect(observableObj).toEqual({});
  });

  it('constructs with empty object', () => {
    const observableObj = new ObservableObject({}).get();
    expect(observableObj).toEqual({});
  });

  it('constructs with object of primitive values', () => {
    const observableObj = new ObservableObject(employee).get();
    expect(observableObj).toEqual(employee);
  });
});

describe('ObservableObject recursively makes all properties observable', () => {
});

describe('getter and setter work correctly', () => {
});

describe('observableObject can be reassigned to other types', () => {
  let observable;
  beforeEach(() => {
    observable = new ObservableArray({ foo: 'hello', bar: 'world' });
  });

  it('can be reassign to object', () => {
    observable.set({ foo: 123 });
    const val = observable.get();

    expect(val).toEqual({ foo: 123 });
  });

  it('can be reassign to array', () => {
    observable.set([4, 5, 6, 7]);
    const val = observable.get();
    const { push, pop, map, filter } = val;

    expect(Array.from(val)).toEqual([4, 5, 6, 7]);
    expect(typeof push).toBe('function');
    expect(typeof pop).toBe('function');
    expect(typeof map).toBe('function');
    expect(typeof filter).toBe('function');
    expect(observable.get()).toHaveLength(4);
  });

  it('can be reassign to primitive value', () => {
    observable.set(1);
    const val = observable.get();

    expect(val).toBe(1);
  });

  it('can be reassign to null', () => {
    observable.set(null);
    expect(observable.get()).toBe(null);
  });

  it('can be reassign to undefined', () => {
    observable.set(undefined);
    expect(observable.get()).toBe(undefined);
  });

  it('can be reassign again and again', () => {
    observable.set(1);
    observable.set([1, 2, 3]);
    observable.set({ hello: 'world' });
    const val = observable.get();

    expect(val).toEqual({ hello: 'world' });
  });
});
