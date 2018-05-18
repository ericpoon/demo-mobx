/** Set up enzyme **/
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
/** ************* **/

import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Task from './fixture/Task';
import { observer } from '../src/core';

describe('@observer integrates perfectly with react component', () => {
  let mockFn;
  let ReactComponent;
  beforeEach(() => {
    mockFn = jest.fn();

    @observer
    class Comp extends Component {
      render() {
        const { title, done } = this.props.task;
        mockFn(title, done);
        return <p>{title}{done ? 'done' : 'to be done'}</p>;
      }
    }

    ReactComponent = Comp;
  });

  it('observes the change of observable props', () => {

    const task = new Task('Task A', false);

    shallow(<ReactComponent task={task} />);
    expect(mockFn).toHaveBeenLastCalledWith('Task A', false);

    task.title = 'Task B';
    expect(mockFn).toHaveBeenLastCalledWith('Task B', false);

    task.done = true;
    expect(mockFn).toHaveBeenLastCalledWith('Task B', true);
  });

});
