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
});

describe('getter and setter work correctly', () => {
  it('gets the array');
  it('sets to a new array and remains as an observable');
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
});
