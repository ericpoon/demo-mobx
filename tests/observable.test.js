import { observable } from '../src/core';

it('binds instance property properly (instance-specific bound)', () => {
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
