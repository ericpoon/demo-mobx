import ObservableInterface from './ObservableInterface';

class ObservableProperty extends ObservableInterface {
  constructor(value, name) {
    super(name);
    this.value = value;
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

export default ObservableProperty;
