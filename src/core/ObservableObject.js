import ObservableInterface from './ObservableInterface';
import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

class ObservableObject extends ObservableInterface {
  constructor(object, { name = '' } = {}) {
    super('[object] ' + name, false);
    this._name = name;
    this._initializeObject(object);
  }

  get = () => {
    this._registerAutorun(this);
    return this.object;
  };

  set = (newObject) => {
    this.object = getObservableWithCorrectType(newObject, this._name).get();
    this._triggerAutorun();
  };

  _initializeObject(plainObject = {}) {
    /** null should never be passed into this function,
     * but we keep this checking as a good practice of defensive programming
     */
    if (plainObject === null) {
      this.object = getObservableWithCorrectType(null, this._name).get();
      return;
    }

    const keys = Object.keys(plainObject);
    const object = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = plainObject[key];
      const fullyQualifiedName = this._name + '#' + key + '#' + Math.random().toString().substr(2, 4);
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
    this.object = object;
  }
}

export default ObservableObject;
