import ObservableInterface from './ObservableInterface';

class ObservablePrimitive extends ObservableInterface {
  constructor(value, { name = '' } = {}) {
    super('[primitive] ' + name, false);
    this.value = value;
    Object.defineProperty(this, 'autoruns', { enumerable: false });
    Object.defineProperty(this, 'value', { enumerable: false });
    Object.defineProperty(this, 'get', { enumerable: false });
    Object.defineProperty(this, 'set', { enumerable: false });
  }

  get = () => {
    this._registerAutorun(this);
    return this.value;
  };

  set = (newValue) => {
    this.value = newValue;
    this._triggerAutorun();
  };
}

export default ObservablePrimitive;
