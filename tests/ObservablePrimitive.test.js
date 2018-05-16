import ObservablePrimitive from '../src/core/ObservablePrimitive';

describe('ObservablePrimitive can be reassigned to other types', () => {
  let observable;
  beforeEach(() => {
    observable = new ObservablePrimitive(100);
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
    observable.set([1, 2, 3]);
    observable.set({ hello: 'world' });
    observable.set(10);
    const val = observable.get();

    expect(val).toBe(10);
  });
});
