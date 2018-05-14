export default class ObservableInterface {
  static initializingAutorun = null;

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
    for (let i = 0; i < this.autoruns.length; i++) {
      const fn = this.autoruns[i];
      fn.run();
    }
  }
}
