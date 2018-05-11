import { observable } from '../../src/core/index';

export default class Person {
  constructor(f, l, n) {
    this.firstName = f;
    this.lastName = l;
    this.nickName = n;
  }

  @observable firstName;
  @observable lastName;
  @observable nickName;

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
