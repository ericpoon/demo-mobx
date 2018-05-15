import ObservableInterface from './ObservableInterface';
import ObservablePrimitive from './ObservablePrimitive';

class ObservableArray extends ObservableInterface {
  constructor(plainArray, { name = '' } = {}) {
    super('[array] ' + name, false);
    this._name = name;
    this._initializeArray(plainArray);
  }

  get = () => {
    this._registerAutorun(this);
    return this.array;
  };

  set = (plainArray) => {
    this._initializeArray(plainArray);
    this._triggerAutorun();
  };

  push = (item) => {
    this.array[this.array.length] = item;
    this.array.length += 1;
    this._triggerAutorun();
    return this.array.length;
  };

  pop = () => {
    this.array.length -= 1;
    const lastItem = this.array[this.array.length];
    delete this.array[this.array.length];
    this._triggerAutorun();
    return lastItem;
  };

  filter = (fn) => {
    const plainArr = Array.from(this.array);
    const name = `filtered#${Math.random().toString().substr(2, 4)}`;
    return new ObservableArray(plainArr.filter(fn), { name }).array;
  };

  map = (fn) => {
    const plainArr = Array.from(this.array);
    const name = `mapped#${Math.random().toString().substr(2, 4)}`;
    return new ObservableArray(plainArr.map(fn), { name }).array;
  };

  _initializeArray(plainArray = []) {
    this.array = {
      length: 0,
      push: this.push,
      pop: this.pop,
      filter: this.filter,
      map: this.map,
    };

    Object.keys(this.array).forEach(key => {
      Object.defineProperty(this.array, key, { enumerable: false });
    });

    if (plainArray && plainArray.length) {
      this.array.length = plainArray.length;
      for (let i = 0; i < plainArray.length; i++) {
        const value = plainArray[i];
        const fullyQualifiedName = this._name + '#' + i + '#' + Math.random().toString().substr(2, 4);
        const observableProp = new ObservablePrimitive(value, { name: fullyQualifiedName });
        Object.defineProperty(this.array, i, {
          enumerable: true,
          configurable: true,
          get() {
            return observableProp.get();
          },
          set(newValue) {
            observableProp.set(newValue);
          },
        });
      }
    }
  }
}

export default ObservableArray;
