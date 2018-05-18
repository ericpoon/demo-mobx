import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, observer } from '../../src/core/index';

@observer
class Main extends Component {
  render() {
    const { counter } = this.props;

    return (
      <p>Count: {counter.count}</p>
    );
  }
}

class Counter {
  @observable
  count = 0;
}

const counter = new Counter();

setInterval(() => {
  counter.count += 1;
}, 300);

const app = document.getElementById('counter-app');
if (app) ReactDom.render(<Main counter={counter} />, app);
