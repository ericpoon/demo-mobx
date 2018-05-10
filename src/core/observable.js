import ObservableProperty from './ObservableProperty';

export default function observable(target, name, descriptor) {
  const { enumerable, configurable, initializer } = descriptor;
  const fullyQualifiedName = target.constructor.name + '#' + name;
  let value = undefined;
  if (initializer) {
    value = initializer();
  }
  const observableProp = new ObservableProperty(value, fullyQualifiedName);
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
