export default class ObservableArray {
  constructor(plainArray, name) {
    this._initializeArray(plainArray);
    console.log('initialized', name);
  }

  get = () => {
    return this.array;
  };

  push = (item) => {
    this.array[this.array.length] = item;
    this.array.length += 1;
    return this.array.length;
  };

  pop = () => {
    this.array.length -= 1;
    const lastItem = this.array[this.array.length];
    delete this.array[this.array.length];
    return lastItem;
  };

  set = (plainArray) => {
    this._initializeArray(plainArray);
  };

  _initializeArray(plainArray) {
    this.array = {
      length: 0,
      push: this.push,
      pop: this.pop,
    };

    Object.keys(this.array).forEach(key => {
      Object.defineProperty(this.array, key, { enumerable: false });
    });

    if (plainArray && plainArray.length) {
      this.array.length = plainArray.length;
      for (let i = 0; i < plainArray.length; i++) {
        this.array[i] = plainArray[i];
      }
    }
  }
}
