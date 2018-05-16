import ObservableInterface from './ObservableInterface';
import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

class ObservableObject extends ObservableInterface {
  constructor(object, { name = '' } = {}) {
    super('[object] ' + name, false);
    this._name = name;
    this.object = ObservableObject._initializeObject(object, this._name);
  }

  get = () => {
    this._registerAutorun(this);
    return this.object;
  };

  set = (newProperty) => {
    // todo: use getObservableWithCorrectType
    this.object = ObservableObject._initializeObject(newProperty, this._name);
    this._triggerAutorun();
  };

  // (√) todo: change to pure function
  static _initializeObject(plainObject = {}, name) {
    if (plainObject === null) plainObject = {};

    const keys = Object.keys(plainObject);
    const object = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = plainObject[key];
      const fullyQualifiedName = !name ? undefined : name + '#' + key + '#' + Math.random().toString().substr(2, 4);
      const observableProp = getObservableWithCorrectType(value, fullyQualifiedName);
      Object.defineProperty(object, key, {
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

    return object;
  }
}

export default ObservableObject;
