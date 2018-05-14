import observable from './core/observable';
import autorun from './core/autorun';

class Tester {
  @observable
  array = ['Tommy', 'Jane', 'Roy'];

}

const tester = new Tester();

autorun(() => {
  console.log(Array.from(tester.array));
});

tester.array.push('Eric');
tester.array.pop();
tester.array.pop();
