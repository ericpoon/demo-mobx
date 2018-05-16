import ObservableInterface from './ObservableInterface';
import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

class ObservablePrimitive extends ObservableInterface {
  constructor(value, { name = '' } = {}) {
    super('[primitive] ' + name, false);
    this._name = name;
    this.value = value;
  }

  get = () => {
    this._registerAutorun(this);
    return this.value;
  };

  set = (newValue) => {
    this.value = getObservableWithCorrectType(newValue, this._name).get();
    this._triggerAutorun();
  };
}

export default ObservablePrimitive;
