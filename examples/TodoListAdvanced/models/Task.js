import { observable } from '../../../src/core';

export default class Task {
  constructor(t, d) {
    this.title = t;
    this.done = d;
  }

  @observable title;
  @observable done;
}
