import ObservableInterface from './ObservableInterface';
import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

class ObservableArray extends ObservableInterface {
  constructor(array, { name = '' } = {}) {
    super('[array] ' + name, false);
    this._name = name;
    this._initializeArray(array);
  }

  get = () => {
    this._registerAutorun(this);
    return this.array;
  };

  set = (array) => {
    // todo: use getObservableWithCorrectType
    this._initializeArray(array);
    this._triggerAutorun();
  };

  push = (item) => {
    const observableProp = getObservableWithCorrectType(item);
    Object.defineProperty(this.array, this.array.length, {
      enumerable: true,
      configurable: true,
      get() {
        return observableProp.get();
      },
      set(newValue) {
        observableProp.set(newValue);
      },
    });
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

    /** We must create a new observable array object so the `this` is bound correctly to the new one;
     * This doesn't lead to over-subscribing issue because we don't access the new array via getter*/
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
        const observableProp = getObservableWithCorrectType(value, fullyQualifiedName);
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
