import ObservablePrimitive from '../core/ObservablePrimitive';
import ObservableArray from '../core/ObservableArray';
import ObservableObject from '../core/ObservableObject';

export function getObservableWithCorrectType(value, name = '') {
  if (Array.isArray(value)) {
    return new ObservableArray(value, { name });
  } else if (typeof value === 'object') {
    return new ObservableObject(value, { name });
  } else {
    return new ObservablePrimitive(value, { name });
  }
}
