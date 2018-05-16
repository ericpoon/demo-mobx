import { getObservableWithCorrectType } from '../../src/utils/observableTypeHelper';
import ObservablePrimitive from '../../src/core/ObservablePrimitive';
import ObservableArray from '../../src/core/ObservableArray';
import ObservableObject from '../../src/core/ObservableObject';

it('returns an instance of ObservablePrimitive', () => {
  let observable;

  observable = getObservableWithCorrectType(1);
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  observable = getObservableWithCorrectType(true);
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  observable = getObservableWithCorrectType(false);
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  observable = getObservableWithCorrectType('str');
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  observable = getObservableWithCorrectType('');
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  // intensively consider null as primitive but not object
  observable = getObservableWithCorrectType(null);
  expect(observable).toBeInstanceOf(ObservablePrimitive);

  observable = getObservableWithCorrectType(undefined);
  expect(observable).toBeInstanceOf(ObservablePrimitive);
});

it('returns an instance of ObservableArray', () => {
  let observable;

  observable = getObservableWithCorrectType([]);
  expect(observable).toBeInstanceOf(ObservableArray);

  observable = getObservableWithCorrectType([1, 'str']);
  expect(observable).toBeInstanceOf(ObservableArray);
});

it('returns an instance of ObservableObject', () => {
  let observable;

  observable = getObservableWithCorrectType({});
  expect(observable).toBeInstanceOf(ObservableObject);

  observable = getObservableWithCorrectType({ foo: 'hello' });
  expect(observable).toBeInstanceOf(ObservableObject);
});
