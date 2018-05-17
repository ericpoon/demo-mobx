import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, autorun } from './core';

class Main extends Component {
  state = { count: 0 };

  componentDidMount() {
    autorun(() => {
      this.setState({ count: tester.count });
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}

class Tester {
  @observable
  count = 0;
}

const tester = new Tester();

ReactDom.render(<Main />, document.getElementById('app'));

setInterval(() => {
  tester.count += 1;
}, 300);
