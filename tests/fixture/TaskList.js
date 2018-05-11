import { observable } from '../../src/core/index';

export default class TaskList {
  @observable tasks = [];

  get finishedTasks() {
    return this.tasks.filter(t => t.done).map(t => t.title);
  }
}
