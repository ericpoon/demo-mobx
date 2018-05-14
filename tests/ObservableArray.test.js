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
  let array;
  beforeEach(() => {
    array = new ObservableArray(['Foo', 'Bar', 14000605]).get();

  });

  it('can push', () => {
    const item = 'new item';
    const newLength = array.push(item);
    expect(array).toHaveLength(newLength);
    expect(array[array.length - 1]).toBe(item);
  });

  it('can pop', () => {
    const oldLength = array.length;
    const lastItem = array[array.length - 1];
    const poppedItem = array.pop();
    expect(array).toHaveLength(oldLength - 1);
    expect(poppedItem).toBe(lastItem);
    expect(array[array.length]).toBeUndefined();
  });
});

