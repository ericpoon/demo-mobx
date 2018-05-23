import ObservableInterface from './ObservableInterface';

export default class AutorunFunction {
  constructor(fn) {
    this._fn = fn;
    Object.defineProperty(this, '_fn', { enumerable: false });
  }

  _runInAction = (fn) => {
    /**
     * this is to support async autorun functions,
     * we only need runInAction() when the autorun function
     * accesses an observable in an async manner
     */
    this.dispose();

    ObservableInterface.initializingAutorun = this;
    try {
      fn();
    } finally {
      ObservableInterface.initializingAutorun = null;
    }
  };

  run = () => {
    this.dispose();

    ObservableInterface.initializingAutorun = this;
    try {
      this._fn(this._runInAction);
    } finally {
      ObservableInterface.initializingAutorun = null;
    }
  };

  dispose = () => {
    for (let i = 0; i < this.observables.length; i++) {
      const o = this.observables[i];
      const idx = o.autoruns.indexOf(this);
      if (idx >= 0) {
        o._unregisterAutorun(idx);
      }
    }
  };

  getDisposer = () => {
    return this.dispose;
  };

  registeredBy = (o) => {
    this.observables.push(o);
  };

  observables = [];
}
