let initializingAutorun = null;

class ObservableProperty {
  constructor(value, fullyQualifiedName) {
    this.value = value;
    this.fullyQualifiedName = fullyQualifiedName;
  }

  autoruns = [];

  get() {
    if (initializingAutorun) {
      console.log('Adding autorun to', this.fullyQualifiedName);
      this.autoruns.push(initializingAutorun);
    }
    return this.value;
  }

  set(newValue) {
    this.value = newValue;
    for (let i = 0; i < this.autoruns.length; i++) {
      this.autoruns[i]();
    }
  }
}

function observable(target, name, descriptor) {
  const { enumerable, configurable, initializer } = descriptor;
  const value = initializer();
  const fullyQualifiedName = target.constructor.name + '#' + name;
  const observableProp = new ObservableProperty(value, fullyQualifiedName);
  return {
    enumerable,
    configurable,
    get() {
      return observableProp.get();
    },
    set(newValue) {
      observableProp.set(newValue);
    },
  };
}

function computed(target, name, descriptor) {
}

function autorun(fn) {
  initializingAutorun = fn;
  try {
    fn();
  } finally {
    initializingAutorun = null;
  }
}

class Tester {
  @observable price = 0;
  @observable amount = 1;

  @computed get total() {
    return this.price * this.amount;
  }

  @computed get discountPrice() {
    return this.total * 0.8;
  }
}

const tester = new Tester();

autorun(() => {
  console.log('[autorun] price =', tester.price);
});

autorun(() => {
  console.log('[autorun] total =', tester.total);
});

autorun(() => {
  console.log('[autorun] discount =', tester.discountPrice);
});

tester.price = 100;
tester.price = 30;

tester.amount = 2;
