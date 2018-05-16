import ObservableInterface from './ObservableInterface';
import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

class ObservableArray extends ObservableInterface {
  constructor(array, { name = '' } = {}) {
    super('[array] ' + name, false);
    this._name = name;
    this.array = ObservableArray._initializeArray(array, this._getMethodList(), this._name);
  }

  _getMethodList = () => {
    return {
      push: this.push,
      pop: this.pop,
      filter: this.filter,
      map: this.map,
    };
  };

  get = () => {
    this._registerAutorun(this);
    return this.array;
  };

  set = (array) => {
    // todo: use getObservableWithCorrectType
    this.array = ObservableArray._initializeArray(array, this._getMethodList(), this._name);
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

    // todo: use _initializeArray here
    return new ObservableArray(plainArr.filter(fn), { name }).array;
  };

  map = (fn) => {
    const plainArr = Array.from(this.array);
    const name = `mapped#${Math.random().toString().substr(2, 4)}`;

    // todo: use _initializeArray here
    return new ObservableArray(plainArr.map(fn), { name }).array;
  };

  // (√) todo: change to pure function
  static _initializeArray(plainArray = [], arrayMethods, name) {
    const array = {
      length: 0,
    };

    Object.keys(arrayMethods).forEach(key => {
      array[key] = arrayMethods[key];
    });

    Object.keys(array).forEach(key => {
      Object.defineProperty(array, key, { enumerable: false });
    });

    if (plainArray && plainArray.length) {
      array.length = plainArray.length;
      for (let i = 0; i < plainArray.length; i++) {
        const value = plainArray[i];
        const fullyQualifiedName = !name ? undefined : name + '#' + i + '#' + Math.random().toString().substr(2, 4);
        const observableProp = getObservableWithCorrectType(value, fullyQualifiedName);
        Object.defineProperty(array, i, {
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

    return array;
  }
}

export default ObservableArray;
