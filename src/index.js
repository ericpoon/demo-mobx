import ObservableArray from './core/ObservableArray';
import observable from './core/observable';
//
// const array = new ObservableArray([1, 2, 3]).get();
//
// console.log(array);
// array.push('123');
// console.log(array);
// console.log(array.pop());
// console.log(array);
// console.log(array.pop());
// console.log(array);

class Tester {
  @observable
  array = ['Tommy', 'Jane', 'Roy'];

}

const array = new Tester().array;

console.log(array.push(1));
