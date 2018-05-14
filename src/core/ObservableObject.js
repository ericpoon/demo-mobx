import ObservableInterface from './ObservableInterface';
import ObservableProperty from './ObservableProperty';

class ObservableObject extends ObservableInterface {
  constructor(object, name) {
    super(name);
    this._initializeObject(object);
  }

  get = () => {
    this._registerAutorun(this);
    return this.object;
  };

  set = (newObject) => {
    this._initializeObject(newObject);
    this._triggerAutorun();
  };

  _initializeObject(plainObject) {
    const keys = Object.keys(plainObject);
    const object = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = plainObject[key];
      const observableProp = new ObservableProperty(value);
      // todo: support array and nested object
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
