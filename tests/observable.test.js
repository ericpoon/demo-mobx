import { observable, autorun } from '../src/core';
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
      expect(tester2.foo).toEqual(null);
    });

    it('works when observable is initialized via assignment', () => {
      class Tester {
        @observable foo = undefined;
        @observable bar = null;
      }

      const tester = new Tester();
      expect(tester.foo).toBe(undefined);
      expect(tester.bar).toEqual(null);
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

    tester.primitive = [100, 101];
    expect(Array.from(getArgsInLastCall(mockFn)[0])).toEqual([100, 101]);

    tester.primitive = { hello: 123 };
    expect(mockFn).toHaveBeenLastCalledWith({ hello: 123 });

    tester.primitive = undefined;
    expect(mockFn).toHaveBeenLastCalledWith(undefined);

    tester.primitive = null;
    expect(getArgsInLastCall(mockFn)[0]).toEqual(null);

    tester.primitive = tester.array;
    expect(mockFn).toHaveBeenLastCalledWith(tester.array);

    expect(mockFn).toHaveBeenCalledTimes(7);
  });

  it('is still observable after reassignment - array', () => {
    autorun(() => mockFn(tester.array));
    expect(mockFn).toHaveBeenCalledTimes(1);

    tester.array = 2;
    expect(mockFn).toHaveBeenLastCalledWith(2);

    tester.array = [100, 101];
    expect(Array.from(getArgsInLastCall(mockFn)[0])).toEqual([100, 101]);

    tester.array = { hello: 123 };
    expect(mockFn).toHaveBeenLastCalledWith({ hello: 123 });

    tester.array = undefined;
    expect(mockFn).toHaveBeenLastCalledWith(undefined);

    tester.array = null;
    expect(getArgsInLastCall(mockFn)[0]).toEqual(null);

    tester.array = tester.primitive;
    expect(mockFn).toHaveBeenLastCalledWith(tester.primitive);

    expect(mockFn).toHaveBeenCalledTimes(7);
  });

  it('is still observable after reassignment - object itself', () => {
    autorun(() => mockFn(tester.object));
    expect(mockFn).toHaveBeenCalledTimes(1);

    tester.object = 2;
    expect(mockFn).toHaveBeenLastCalledWith(2);

    tester.object = [100, 101];
    expect(Array.from(getArgsInLastCall(mockFn)[0])).toEqual([100, 101]);

    tester.object = { hello: 123 };
    expect(mockFn).toHaveBeenLastCalledWith({ hello: 123 });

    tester.object = undefined;
    expect(mockFn).toHaveBeenLastCalledWith(undefined);

    tester.object = null;
    expect(getArgsInLastCall(mockFn)[0]).toEqual(null);

    tester.object = tester.primitive;
    expect(mockFn).toHaveBeenLastCalledWith(tester.primitive);

    expect(mockFn).toHaveBeenCalledTimes(7);
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

  it('array items are no longer observable if the array is returned from array operations (mapping etc.)', () => {
    /**
     * the returned array should not contain observable items, as they are copied from the original array,
     * and those items in original array are already observable,
     * in short, there is no point to have two observable items that are exactly the same
     */
    let arrayMapped = tester.array.map(i => i * 3);
    let arrayFiltered = tester.array.filter(i => i % 2 === 0);
    let arrayMappedFiltered = tester.array.map(i => i * 3).filter(i => i % 2 === 0);
    let arrayFilteredMapped = tester.array.filter(i => i % 2 === 0).map(i => i * 3);
    autorun(() => mockFn(arrayMapped[0]));
    autorun(() => mockFn(arrayFiltered[0]));
    autorun(() => mockFn(arrayMappedFiltered[0]));
    autorun(() => mockFn(arrayFilteredMapped[0]));
    expect(mockFn).toHaveBeenCalledTimes(4);

    // if a property is NOT an observable, then re-assigning it should not trigger autorun

    arrayMapped[0] = 'foo1';
    arrayFiltered[0] = 'foo2';
    arrayMappedFiltered[0] = 'foo3';
    arrayFilteredMapped[0] = 'foo4';

    expect(mockFn).toHaveBeenCalledTimes(4);
  });
});
