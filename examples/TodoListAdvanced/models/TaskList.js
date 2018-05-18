import { observable } from '../../../src/core';

export default class TaskList {
  @observable list = [];

  get finished() {
    return this.list.filter(i => i.done);
  }

  get unfinished() {
    return this.list.filter(i => !i.done);
  }
}
