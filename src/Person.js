import observable from './core/observable';

export default class Person {
  @observable firstName;
  @observable lastName;
  @observable nickName;

  constructor(f, l, n) {
    this.firstName = f;
    this.lastName = l;
    this.nickName = n;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
