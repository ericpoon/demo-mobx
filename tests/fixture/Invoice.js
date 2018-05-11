import { observable } from '../../src/core/index';

export default class Invoice {
  constructor(p, a) {
    this.price = p;
    this.amount = a;
  }

  @observable price;
  @observable amount;

  get total() {
    return this.price * this.amount;
  }

  get tenPercentOff() {
    return this.total * 0.9;
  }
}
