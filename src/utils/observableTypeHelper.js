import ObservablePrimitive from '../core/ObservablePrimitive';
import ObservableArray from '../core/ObservableArray';
import ObservableObject from '../core/ObservableObject';

export function getObservableWithCorrectType(value, name = '') {
  /** null is of type object, but we consider it a primitive so as to preserve its value,
   * if we consider `null` an object, then ObservableObject will confuse it with empty object {}
   * */
  if (value === null) {
    return new ObservablePrimitive(value, { name });
  } else if (Array.isArray(value)) {
    return new ObservableArray(value, { name });
  } else if (typeof value === 'object') {
    return new ObservableObject(value, { name });
  } else {
    return new ObservablePrimitive(value, { name });
  }
}
