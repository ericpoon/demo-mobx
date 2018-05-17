import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, autorun } from '../../src/core/index';

class Main extends Component {
  state = { count: 0 };

  componentDidMount() {
    const { counter } = this.props;

    autorun(() => {
      this.setState({ count: counter.count });
    });
  }

  render() {
    return (
      <p>Count: {this.state.count}</p>
    );
  }
}

class Counter {
  @observable
  count = 0;
}

const counter = new Counter();

ReactDom.render(<Main counter={counter} />, document.getElementById('counter-app'));

setInterval(() => {
  counter.count += 1;
}, 300);
