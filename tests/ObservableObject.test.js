import ObservableObject from '../src/core/ObservableObject';

const employee = {
  id: 12345678,
  name: 'John',
  isManager: true,
};

describe('ObservableObject constructs correctly', () => {
  it('constructs with no arg', () => {
    const observableObj = new ObservableObject().get();
    expect(observableObj).toEqual({});
  });

  it('constructs with empty object', () => {
    const observableObj = new ObservableObject({}).get();
    expect(observableObj).toEqual({});
  });

  it('constructs with object of primitive values', () => {
    const observableObj = new ObservableObject(employee).get();
    expect(observableObj).toEqual(employee);
  });
});

describe('ObservableObject has one level deep of observable', () => {
  it('has observable properties for object of primitive values', () => {
    const observableObj = new ObservableObject(employee).get();
    const keys = Object.keys(employee);
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(observableObj, key);
      expect(descriptor.get.toString()).toMatch(/observableProp.get\(\)/);
      expect(descriptor.set.toString()).toMatch(/observableProp.set\(.*\)/);
    }
  });
  it('has observable properties for object of arrays');
  it('has observable properties for object of objects');
});

describe('getter and setter work correctly', () => {
});
