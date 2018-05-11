export default class ObservableProperty {
  static initializingAutorun = null;

  constructor(value) {
    this.value = value;
  }

  autoruns = [];

  get() {
    const autorun = ObservableProperty.initializingAutorun;
    if (autorun && !this.autoruns.includes(autorun)) {
      this.autoruns.push(autorun);
      /* two way binding, autorun function also binds this observable,
         so later autorun function can remove itself from this observable */
      autorun.registeredBy(this);
    }
    return this.value;
  }

  set(newValue) {
    this.value = newValue;
    for (let i = 0; i < this.autoruns.length; i++) {
      const fn = this.autoruns[i];
      fn.run();
    }
  }
}
