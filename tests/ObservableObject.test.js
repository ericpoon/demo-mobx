import ObservableObject from '../src/core/ObservableObject';

const employee = {
  id: 12345678,
  name: 'John',
  isManager: true,
};

const course = {
  students: ['John', 'Mary', 'Tom', 'Adam', 'Lucy'],
  instructors: ['David', 'Thomas'],
};

const department = {
  employee,
  course,
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

describe('ObservableObject has one level deep of observable by default', () => {
  it('has observable properties for object of primitive values', () => {
    const observableObj = new ObservableObject(employee).get();
    const keys = Object.keys(employee);
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(observableObj, key);
      expect(descriptor.get.toString()).toMatch(/observableProp.get\(\)/);
      expect(descriptor.set.toString()).toMatch(/observableProp.set\(.*\)/);
    }
  });
  it('has observable properties for object of arrays', () => {
    const observableObj = new ObservableObject(course).get();
    const keys = Object.keys(course);
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(observableObj, key);
      expect(descriptor.get.toString()).toMatch(/observableProp.get\(\)/);
      expect(descriptor.set.toString()).toMatch(/observableProp.set\(.*\)/);
    }
  });
  it('has observable properties for object of objects', () => {
    const observableObj = new ObservableObject(department).get();
    const keys = Object.keys(department);
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(observableObj, key);
      expect(descriptor.get.toString()).toMatch(/observableProp.get\(\)/);
      expect(descriptor.set.toString()).toMatch(/observableProp.set\(.*\)/);
    }
  });
});

describe('getter and setter work correctly', () => {
});
