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

describe('ObservableObject recursively makes all properties observable', () => {
});

describe('getter and setter work correctly', () => {
});
