import ObservableInterface from './ObservableInterface';

class ObservableArray extends ObservableInterface {
  constructor(plainArray, name) {
    super(name);
    this._initializeArray(plainArray);
  }

  get = () => {
    this._registerAutorun(this);
    return this.array;
  };

  set = (plainArray) => {
    this._initializeArray(plainArray);
    this._triggerAutorun();
  };

  push = (item) => {
    this.array[this.array.length] = item;
    this.array.length += 1;
    this._triggerAutorun();
    return this.array.length;
  };

  pop = () => {
    this.array.length -= 1;
    const lastItem = this.array[this.array.length];
    delete this.array[this.array.length];
    this._triggerAutorun();
    return lastItem;
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

export default ObservableArray;
