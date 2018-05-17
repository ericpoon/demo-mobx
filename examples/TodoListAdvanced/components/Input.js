import React, { Component } from 'react';
import { autorun } from '../../../src/core';

class Input extends Component {

  componentDidMount() {
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  }

  render() {
    const { label, buttonText, inputObservable, onSubmit } = this.props;
    return (
      <div>
        {label}
        <input
          type={'text'}
          value={inputObservable.value}
          onChange={event => {
            inputObservable.value = event.target.value;
          }}
        />
        <button onClick={onSubmit}>{buttonText}</button>
      </div>
    );
  }
}

export default Input;
