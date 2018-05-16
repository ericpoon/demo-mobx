import AutorunFunction from './AutorunFunction';

export default function autorun(fn) {
  const autorunFn = new AutorunFunction(fn);
  autorunFn.run();
  return autorunFn.getDisposer();
}
