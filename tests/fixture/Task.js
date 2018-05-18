import { observable } from '../../src/core';

export default class Task {
  @observable title;
  @observable done;

  constructor(t, d) {
    this.title = t;
    this.done = d;
  }
}
