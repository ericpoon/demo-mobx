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

  set = (newArray) => {
    this.array = getObservableWithCorrectType(newArray, this._name).get();
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
    if (this.array.length === 0) {
      throw new Error(`[ObservableArray] Trying to pop an empty array`);
    }

    this.array.length -= 1;
    const lastItem = this.array[this.array.length];
    delete this.array[this.array.length];
    this._triggerAutorun();
    return lastItem;
  };

  remove = (idx) => {
    if (idx < 0 || idx >= this.array.length) {
      throw new Error(`[ObservableArray] Trying to remove at an index out of range: ${idx}`);
    }

    const removed = this.array[idx];
    if (idx === 0 && this.array.length === 1) {
      delete this.array[0];
    } else if (idx === this.array.length - 1) {
      delete this.array[idx];
    } else {
      for (let i = idx; i < this.array.length - 1; i++) {
        this.array[i] = this.array[i + 1];
      }
      delete this.array[this.array.length - 1];
    }
    this.array.length -= 1;

    this._triggerAutorun();
    return removed;
  };

  filter = (fn) => {
    const plainArr = Array.from(this.array);
    const name = `filtered#${Math.random().toString().substr(2, 4)}`;

    // /** We must create a new observable array object so the `this` is bound correctly to the new one;
    //  * This doesn't lead to over-subscribing issue because we don't access the new array via getter*/
    // return new ObservableArray(plainArr.filter(fn), { name }).array;

    /* Perhaps the returned array's element should not be observable,
    as it's a copied version and the original one is still observable */
    return plainArr.filter(fn);
  };

  map = (fn) => {
    const plainArr = Array.from(this.array);
    const name = `mapped#${Math.random().toString().substr(2, 4)}`;

    // return new ObservableArray(plainArr.map(fn), { name }).array;

    return plainArr.map(fn);
  };

  _initializeArray(plainArray = []) {
    this.array = {
      length: 0,
      push: this.push,
      pop: this.pop,
      remove: this.remove,
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
