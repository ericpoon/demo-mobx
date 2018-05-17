export default class TaskList {
  list = [];

  get finished() {
    return this.list.filter(i => i.done);
  }

  get unfinished() {
    return this.list.filter(i => !i.done);
  }
}
