import { getObservableWithCorrectType } from '../utils/observableTypeHelper';

export default function observable(target, name, descriptor) {
  function getInstanceSpecificPropDescriptor(target, name, classPropDescriptor, value) {
    const { enumerable, configurable, initializer } = classPropDescriptor;
    const fullyQualifiedName = target.constructor.name + '#' + name + '#' + Math.random().toString().substr(2, 4);
    if (!value && initializer) {
      // this is called lazily in current implementation
      value = initializer();
    }
    const observableProp = getObservableWithCorrectType(value, fullyQualifiedName);
    return {
      enumerable,
      configurable,
      get() {
        return observableProp.get();
      },
      set(newValue) {
        observableProp.set(newValue);
      },
    };
  }

  // this descriptor will be bound to class level (bound to all instances)
  return {
    configurable: true,
    get() {
      const desc = getInstanceSpecificPropDescriptor(target, name, descriptor);

      /* whenever an instance is accessed,
         its property gets rebound with the new instance specific descriptor */
      Object.defineProperty(this, name, desc);
      return desc.get();
    },
    set(newValue) {
      const desc = getInstanceSpecificPropDescriptor(target, name, descriptor, newValue);

      /* whenever an instance is accessed,
         its property gets rebound with the new instance specific descriptor */
      Object.defineProperty(this, name, desc);
      desc.set(newValue);
    },
  };
}
