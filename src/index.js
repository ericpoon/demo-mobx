import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, autorun } from './core';

class Main extends Component {
  state = { count: 0 };

  componentDidMount() {
    console.log('component did mount');
    autorun(() => {
      console.log('changing state', tester.count);
      this.setState({ count: tester.count }, () => console.log('state changed'));
    });
  }

  render() {
    return (
      <div>
        Hello, React and MobX! {this.state.count}
      </div>
    );
  }
}

class Tester {
  @observable
  count = 0;
}

const tester = new Tester();

ReactDom.render(<Main count={tester.count} />, document.getElementById('app'));

setInterval(() => {
  tester.count += 1;
}, 1000);

autorun(() => {
  console.log(tester.count);
});

autorun(() => {
  console.log(tester.count);
});
