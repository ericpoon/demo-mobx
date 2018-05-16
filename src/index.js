import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Main extends Component {
  render() {
    return (
      <div>
        Hello, React and MobX!
      </div>
    );
  }
}

ReactDom.render(<Main />, document.getElementById('app'));
