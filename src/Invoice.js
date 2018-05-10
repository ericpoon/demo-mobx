import observable from './core/observable';

export default class Invoice {
  @observable price = 0;
  @observable amount = 1;

  get total() {
    return this.price * this.amount;
  }

  get discountPrice() {
    return this.total * 0.8;
  }
}
