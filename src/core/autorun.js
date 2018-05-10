import AutorunFunction from './AutorunFunction';

export default function autorun(fn) {
  new AutorunFunction(fn).run();
}
