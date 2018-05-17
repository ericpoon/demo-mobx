import React from 'react';

const TaskItem = ({ task }) => {
  const { title, done } = task;
  const onTaskClick = () => {
    task.done = !task.done;
  };

  return (
    <div>
      <label style={{ color: done ? 'green' : 'red', fontSize: 20, lineHeight: 2 }}>
        <input type={'checkbox'} checked={done} onClick={onTaskClick} />
        {title}
      </label>
    </div>
  );
};

export default TaskItem;
