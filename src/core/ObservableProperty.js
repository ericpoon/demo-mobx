export default class ObservableProperty {
  static initializingAutorun = null;

  constructor(value, fullyQualifiedName) {
    this.value = value;
    this.fullyQualifiedName = fullyQualifiedName;
  }

  autoruns = [];

  get() {
    const autorun = ObservableProperty.initializingAutorun;
    if (autorun && !this.autoruns.includes(autorun)) {
      console.log('@@@ Adding autorun to', this.fullyQualifiedName);
      this.autoruns.push(autorun);
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
