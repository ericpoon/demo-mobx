import { observable, when } from '../src/core';

it('gets triggered once and only once when predicate is evaluated to be truthy', () => {
  class Tester {
    @observable foo = 0;
  }

  const tester = new Tester();
  const spy = jest.fn();
  const largerThanThree = () => tester.foo >= 3;

  when(largerThanThree, () => spy(tester.foo));

  tester.foo++; // 1
  tester.foo++; // 2
  expect(spy).not.toHaveBeenCalled();

  tester.foo++; // 3
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith(3);

  tester.foo++; // 4, not triggering anymore
  expect(spy).toHaveBeenCalledTimes(1);
});
