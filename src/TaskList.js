import observable from './core/observable';

export default class TaskList {
  @observable tasks = [];

  get finishedTasks() {
    return this.tasks.filter(t => t.done).map(t => t.title);
  }
}
