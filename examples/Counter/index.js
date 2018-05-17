import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, autorun } from '../../src/core/index';

class Main extends Component {
  componentDidMount() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }

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
