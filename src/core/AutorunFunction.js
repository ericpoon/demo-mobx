import ObservableProperty from './ObservableProperty';

export default class AutorunFunction {
  constructor(fn) {
    this._fn = fn;
  }

  run() {
    console.log('\n@@@ Start running');
    for (let i = 0; i < this.observables.length; i++) {
      const o = this.observables[i];
      const idx = o.autoruns.indexOf(this);
      if (idx >= 0) {
        console.log('@@@ Removing autorun from', o.fullyQualifiedName);
        o.autoruns.splice(idx, 1);
      }
    }

    ObservableProperty.initializingAutorun = this;
    try {
      this._fn();
    } finally {
      ObservableProperty.initializingAutorun = null;
      console.log('@@@ Finished running\n');
    }
  }

  registeredBy(o) {
    this.observables.push(o);
  }

  observables = [];
}
