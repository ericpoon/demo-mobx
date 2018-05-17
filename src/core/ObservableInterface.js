export default class ObservableInterface {
  static initializingAutorun = null;

  constructor(name, debug) {
    if (debug) console.log('>>> Initializing', name);
  }

  get = () => {
  };

  set = () => {
  };

  autoruns = [];

  _registerAutorun(that) {
    const autorun = ObservableInterface.initializingAutorun;
    if (autorun && !this.autoruns.includes(autorun)) {
      this.autoruns.push(autorun);
      /* two way binding, autorun function also binds this observable,
         so later autorun function can remove itself from this observable */
      autorun.registeredBy(that);
    }
  }

  _triggerAutorun() {
    const safeCopyAutoruns = [...this.autoruns]; // this.autoruns may be mutated by disposer
    for (let i = 0; i < safeCopyAutoruns.length; i++) {
      const fn = safeCopyAutoruns[i];
      fn.run();
    }
  }

  _unregisterAutorun(idx) {
    this.autoruns.splice(idx, 1);
  }
}
