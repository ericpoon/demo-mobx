import ObservableArray from '../src/core/ObservableArray';

describe('ObservableArray constructs correctly', () => {
  it('can be initialized with no arg', () => {
    const array = new ObservableArray().get();
    expect(array).toHaveLength(0);
  });

  it('can be initialized with plain array', () => {
    const plainArray = ['Foo', 'Bar', 14000605];
    const array = new ObservableArray(plainArray).get();
    expect(array).toHaveLength(plainArray.length);
  });

  it('can be initialized with empty plain array', () => {
    const plainArray = [];
    const array = new ObservableArray(plainArray).get();
    expect(array).toHaveLength(plainArray.length);
  });

  it('has array-specific methods / properties', () => {
    const observable = new ObservableArray([1, 2, 3]);
    const { push, pop, remove, map, filter } = observable.get();
    expect(typeof push).toBe('function');
    expect(typeof pop).toBe('function');
    expect(typeof remove).toBe('function');
    expect(typeof map).toBe('function');
    expect(typeof filter).toBe('function');
    expect(observable.get()).toHaveLength(3);
  });
});

describe('getter and setter work correctly', () => {
  it('gets the array');
  it('sets to a new array and remains as an observable');
});

describe('ObservableArray recursively makes all items observable', () => {
});

describe('ObservableArray supports array-like operations', () => {
  let simpleArr;
  let taskList;
  beforeEach(() => {
    simpleArr = new ObservableArray(['Foo', 'Bar', 14000605]).get();
    const taskOne = { title: 'pick up laundry', done: false };
    const taskTwo = { title: 'do schoolwork', done: false };
    const taskThree = { title: 'go running', done: true };
    const taskFour = { title: 'take online course', done: true };
    taskList = new ObservableArray([taskOne, taskTwo, taskThree, taskFour]).get();
  });

  it('can push', () => {
    const item = 'new item';
    const newLength = simpleArr.push(item);
    expect(simpleArr).toHaveLength(newLength);
    expect(simpleArr[simpleArr.length - 1]).toBe(item);
  });

  it('can pop', () => {
    const oldLength = simpleArr.length;
    const lastItem = simpleArr[simpleArr.length - 1];
    const poppedItem = simpleArr.pop();
    expect(simpleArr).toHaveLength(oldLength - 1);
    expect(poppedItem).toBe(lastItem);
    expect(simpleArr[simpleArr.length]).toBeUndefined();
  });

  describe('can remove', () => {
    it('can remove an item in the middle', () => {
      const oldLength = simpleArr.length;
      const itemToRemove = simpleArr[2];
      const removedItem = simpleArr.remove(2);
      expect(simpleArr).toHaveLength(oldLength - 1);
      expect(removedItem).toBe(itemToRemove);
      expect(simpleArr[simpleArr.length]).toBeUndefined();
    });

    it('can remove the first item', () => {
      const oldLength = simpleArr.length;
      const itemToRemove = simpleArr[0];
      const removedItem = simpleArr.remove(0);
      expect(simpleArr).toHaveLength(oldLength - 1);
      expect(removedItem).toBe(itemToRemove);
      expect(simpleArr[simpleArr.length]).toBeUndefined();
    });

    it('can remove the last item', () => {
      const oldLength = simpleArr.length;
      const itemToRemove = simpleArr[simpleArr.length - 1];
      const removedItem = simpleArr.remove(simpleArr.length - 1);
      expect(simpleArr).toHaveLength(oldLength - 1);
      expect(removedItem).toBe(itemToRemove);
      expect(simpleArr[simpleArr.length]).toBeUndefined();
    });

    it('can remove the only item', () => {
      const singleItemArray = new ObservableArray(['foo']).get();
      const removedItem = singleItemArray.remove(0);
      expect(singleItemArray).toHaveLength(0);
      expect(removedItem).toBe('foo');
      expect(singleItemArray[0]).toBeUndefined();
    });

    it('throws if removing index out of range', () => {
      const oldLength = simpleArr.length;
      expect(() => {
        simpleArr.remove(simpleArr.length);
      }).toThrow(/[ObservableArray]/);
      expect(simpleArr).toHaveLength(oldLength);
    });

  });

  it('can map', () => {
    const mapFn = task => task.title;
    const titles = taskList.map(mapFn);
    expect(Array.from(titles))
      .toEqual(Array.from(taskList).map(mapFn));
  });

  it('can filter', () => {
    const filterFn = task => task.done;
    const finishedTaskList = taskList.filter(filterFn);
    expect(Array.from(finishedTaskList))
      .toEqual(Array.from(taskList).filter(filterFn));
  });

  it('can chain up map and filter - filter.map', () => {
    const filterFn = task => task.done;
    const mapFn = task => task.title;
    const finishedTaskTitles = taskList.filter(filterFn).map(mapFn);
    expect(Array.from(finishedTaskTitles))
      .toEqual(Array.from(taskList).filter(filterFn).map(mapFn));
  });

  it('can chain up map and filter - map.filter', () => {
    const mapFn = task => task.title;
    const filterFn = title => title.search(/online course/) > -1;
    const finishedTaskTitles = taskList.map(mapFn).filter(filterFn);
    expect(Array.from(finishedTaskTitles))
      .toEqual(Array.from(taskList).map(mapFn).filter(filterFn));
  });
});

describe('observableArray can be reassigned to other types', () => {
  let observable;
  beforeEach(() => {
    observable = new ObservableArray([1, 2, 3]);
  });

  it('can be reassign to object', () => {
    observable.set({ foo: 123 });
    const val = observable.get();
    const { push, pop, map, filter, length } = val;

    expect(val).toEqual({ foo: 123 });
    expect(push).toBeUndefined();
    expect(pop).toBeUndefined();
    expect(map).toBeUndefined();
    expect(filter).toBeUndefined();
    expect(length).toBeUndefined();
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
    expect(val).toHaveLength(4);
  });

  it('can be reassign to primitive value', () => {
    observable.set(1);
    const val = observable.get();
    const { push, pop, map, filter, length } = val;

    expect(val).toBe(1);
    expect(push).toBeUndefined();
    expect(pop).toBeUndefined();
    expect(map).toBeUndefined();
    expect(filter).toBeUndefined();
    expect(length).toBeUndefined();
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
    observable.set({});
    observable.set([4, 5, 6, 7]);
    const val = observable.get();
    const { push, pop, remove, map, filter } = val;

    expect(Array.from(val)).toEqual([4, 5, 6, 7]);
    expect(typeof push).toBe('function');
    expect(typeof pop).toBe('function');
    expect(typeof remove).toBe('function');
    expect(typeof map).toBe('function');
    expect(typeof filter).toBe('function');
    expect(val).toHaveLength(4);
  });
});
