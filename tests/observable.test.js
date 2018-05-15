import { observable } from '../src/core';

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

describe('@observable remains as an observable property after operations', () => {
  it('is still observable after reassignment');
  it('is still observable after array mapping');
  it('is still observable after array filtering');
});
