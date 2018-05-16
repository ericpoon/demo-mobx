import { observable } from '../src/core';
import autorun from '../src/core/autorun';
import { getArgsInLastCall } from './helpers/mockFunctionHelper';

describe('@observable is initialized correctly', () => {
  describe('works for primitive values', () => {
    it('works when observable is initialized via constructor', () => {
      class Tester {
        constructor(foo) {
          this.foo = foo;
        }

        @observable foo;
      }

      const tester = new Tester(1);
      expect(tester.foo).toBe(1);
    });

    it('works when observable is initialized via assignment', () => {
      class Tester {
        @observable foo = 1;
      }

      const tester = new Tester();
      expect(tester.foo).toBe(1);
    });
  });

  describe('@observable works for array', () => {
    const plainArray = ['Foo', 'Bar', 14000605];

    it('works when observable is initialized via constructor', () => {
      class ArrayTester {
        constructor(a) {
          this.array = a;
        }

        @observable array;
      }

      const tester = new ArrayTester(plainArray);

      expect(Array.from(tester.array)).toEqual(plainArray);
    });

    it('works when observable is initialized via assignment', () => {
      class ArrayTester {
        @observable array = plainArray;
      }

      const tester = new ArrayTester();

      expect(Array.from(tester.array)).toEqual(plainArray);
    });
  });

  describe('@observable works for object', () => {
    const employee = {
      id: 12345678,
      name: 'John',
      isManager: true,
    };

    it('works when observable is initialized via constructor', () => {
      class ObjectTester {
        constructor(o) {
          this.employee = o;
        }

        @observable employee;
      }

      const tester = new ObjectTester(employee);

      expect(tester.employee).toEqual(employee);
    });

    it('works when observable is initialized via assignment', () => {
      class ObjectTester {
        @observable employee = employee;
      }

      const tester = new ObjectTester();

      expect(tester.employee).toEqual(employee);
    });
  });

  describe('works for null and undefined', () => {
    it('works when observable is initialized via constructor', () => {
      class Tester {
        constructor(foo) {
          this.foo = foo;
        }

        @observable foo;
      }

      const tester1 = new Tester(undefined);
      expect(tester1.foo).toBe(undefined);

      const tester2 = new Tester(null);
      expect(tester2.foo).toEqual({});
    });

    it('works when observable is initialized via assignment', () => {
      class Tester {
        @observable foo = undefined;
        @observable bar = null;
      }

      const tester = new Tester();
      expect(tester.foo).toBe(undefined);
      expect(tester.bar).toEqual({});
    });
  });
});

describe('@observable decorates class property in an instance-specific manner', () => {
  it('works for primitive values', () => {
    class Tester {
      constructor(foo) {
        this.foo = foo;
      }

      @observable foo;
    }

    const tester1 = new Tester(1);
    const tester2 = new Tester(2);
    expect(tester1.foo).toBe(1);
    expect(tester2.foo).toBe(2);
  });

  it('works for array', () => {
    class ArrayTester {
      constructor(foo) {
        this.array = foo;
      }

      @observable array;
    }

    const plainArray1 = [1, 2, 3];
    const plainArray2 = [4, 5, 6, 7];
    const tester1 = new ArrayTester(plainArray1);
    const tester2 = new ArrayTester(plainArray2);

    expect(Array.from(tester1.array)).toEqual(plainArray1);
    expect(Array.from(tester2.array)).toEqual(plainArray2);
  });

  it('works for object', () => {
    class ObjectTester {
      constructor(a) {
        this.foo = a;
      }

      @observable
      foo;
    }

    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const tester1 = new ObjectTester(obj1);
    const tester2 = new ObjectTester(obj2);

    expect(tester1.foo).toEqual(obj1);
    expect(tester2.foo).toEqual(obj2);
  });
});

describe('@observable remains as an observable property after reassignment / operations', () => {
  /**
   * There are three types of observable:
   *   primitive
   *   array
   *   object
   *
   * Reassignment could be:
   *   reassign with a new property of the same type
   *   reassign with a new property of different type
   *   reassign with null
   *   reassign with undefined
   *   reassign with another observable
   * */

  class Tester {
    @observable primitive = 1;
    @observable array = [1, 2, 3, 4];
    @observable object = { 'a': 1, 'b': 2 };
  }

  let tester;
  let mockFn;
  beforeEach(() => {
    tester = new Tester();
    mockFn = jest.fn();
  });

  it('is still observable after reassignment - primitive values', () => {
    autorun(() => mockFn(tester.primitive));
    expect(mockFn).toHaveBeenCalledTimes(1);

    tester.primitive = 2;
    expect(mockFn).toHaveBeenLastCalledWith(2);

    tester.primitive = undefined;
    expect(mockFn).toHaveBeenLastCalledWith(undefined);

    tester.primitive = null;
    expect(getArgsInLastCall(mockFn)[0]).toEqual({});

    tester.primitive = [100, 101];
    expect(getArgsInLastCall(mockFn)[0]).toEqual([100, 101]);

    tester.primitive = tester.array;
    expect(mockFn).toHaveBeenLastCalledWith(tester.array);

    expect(mockFn).toHaveBeenCalledTimes(6);
  });

  it('is still observable after reassignment - array', () => {
  });

  it('is still observable after reassignment - object itself', () => {
  });

  it('is still observable after array operations (internal mutation)', () => {
  });
});

describe('@observable creates non-observable with observable properties within', () => {
  class Tester {
    @observable array = [1, 2, 3, 4];
  }

  function getArgInLastCall(mockFn) {
    return Array.from(mockFn.mock.calls[mockFn.mock.calls.length - 1][0]);
  }

  let tester;
  let mockFn;
  beforeEach(() => {
    tester = new Tester();
    mockFn = jest.fn();
  });

  it('does not return an observable from array operations (mapping etc.)', () => {
    let arrayMapped = tester.array.map(i => i * 3);
    let arrayFiltered = tester.array.filter(i => i % 2 === 0);
    let arrayMappedFiltered = tester.array.map(i => i * 3).filter(i => i % 2 === 0);
    let arrayFilteredMapped = tester.array.filter(i => i % 2 === 0).map(i => i * 3);
    autorun(() => mockFn(arrayMapped));
    autorun(() => mockFn(arrayFiltered));
    autorun(() => mockFn(arrayMappedFiltered));
    autorun(() => mockFn(arrayFilteredMapped));
    expect(mockFn).toHaveBeenCalledTimes(4);

    // if a property is NOT an observable, then re-assigning it should NOT trigger autorun

    arrayMapped = 'foo1';
    arrayFiltered = 'foo2';
    arrayMappedFiltered = 'foo3';
    arrayFilteredMapped = 'foo4';

    expect(mockFn).toHaveBeenCalledTimes(4);
  });

  it('contains observable items in the returned array from array operations (mapping etc.)', () => {
    let arrayMapped = tester.array.map(i => i * 3);
    let arrayFiltered = tester.array.filter(i => i % 2 === 0);
    let arrayMappedFiltered = tester.array.map(i => i * 3).filter(i => i % 2 === 0);
    let arrayFilteredMapped = tester.array.filter(i => i % 2 === 0).map(i => i * 3);
    autorun(() => mockFn(Array.from(arrayMapped)));
    autorun(() => mockFn(Array.from(arrayFiltered)));
    autorun(() => mockFn(Array.from(arrayMappedFiltered)));
    autorun(() => mockFn(Array.from(arrayFilteredMapped)));
    expect(mockFn).toHaveBeenCalledTimes(4);

    // if a property is an observable, then re-assigning it should trigger autorun

    arrayMapped[0] = 'foo1';
    expect(getArgInLastCall(mockFn)[0]).toBe('foo1');

    arrayFiltered[0] = 'foo2';
    expect(getArgInLastCall(mockFn)[0]).toBe('foo2');

    arrayMappedFiltered[0] = 'foo3';
    expect(getArgInLastCall(mockFn)[0]).toBe('foo3');

    arrayFilteredMapped[0] = 'foo4';
    expect(getArgInLastCall(mockFn)[0]).toBe('foo4');

    expect(mockFn).toHaveBeenCalledTimes(8);
  });
});

describe('@observable changes type accordingly after reassignment', () => {
});
