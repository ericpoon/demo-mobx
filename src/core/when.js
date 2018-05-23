import AutorunFunction from './AutorunFunction';

export default function when(predicate, fn) {
  const autorunFn = new AutorunFunction(() => {
    if (predicate()) {
      fn();
      autorunFn.getDisposer()();
    }
  });
  autorunFn.run();
}
