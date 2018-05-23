import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { observable, observer } from '../../src/core/index';

/**
 * Note that even though we fetch data in an async way,
 * there's no need for extra configuration/decoration/wrapping,
 * because the render() method of react component is synchronous.
 * Hence, we don't even need runInAction() here.
 * render() method is indeed an autorun function, we only need runInAction()
 * when the autorun function accesses an observable in an async manner
 */

@observer
class Main extends Component {
  render() {
    const { student } = this.props;

    return (
      <div>
        <h2>Student Information</h2>
        <button onClick={loadStudentInfo}>Load</button>
        <p>{student.loading && 'Loading...'}</p>
        <p>{student.data && JSON.stringify(student.data)}</p>
      </div>
    );
  }
}

class Student {
  @observable data = null;
  @observable loading = false;
}

const student = new Student();

const loadStudentInfo = () => {
  student.loading = true;
  student.data = null;
  setTimeout(() => {
    student.data = {
      firstName: 'David',
      lastName: 'Smith',
      major: 'Software Engineering',
      year: 3,
    };
    student.loading = false;
  }, 2000);
};

const app = document.getElementById('async-loading-app');
if (app) ReactDom.render(<Main student={student} />, app);
