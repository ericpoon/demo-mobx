import ObservableInterface from './ObservableInterface';

export default class AutorunFunction {
  constructor(fn) {
    this._fn = fn;
    Object.defineProperty(this, '_fn', {enumerable: false});
  }

  run() {
    for (let i = 0; i < this.observables.length; i++) {
      const o = this.observables[i];
      const idx = o.autoruns.indexOf(this);
      if (idx >= 0) {
        o.autoruns.splice(idx, 1);
      }
    }

    ObservableInterface.initializingAutorun = this;
    try {
      this._fn();
    } finally {
      ObservableInterface.initializingAutorun = null;
    }
  }

  registeredBy(o) {
    this.observables.push(o);
  }

  observables = [];
}
