import React from 'react';

const TaskItem = ({ task, onEditClick, onDeleteClick }) => {
  const { title, done } = task;
  const onTaskClick = () => {
    task.done = !task.done;
  };

  return (
    <div>
      <label style={{ color: done ? 'green' : 'red', fontSize: 20, lineHeight: 2 }}>
        <input type={'checkbox'} checked={done} onChange={onTaskClick} />
        {title}
      </label>
      <button onClick={onEditClick}>Edit</button>
      <button onClick={onDeleteClick}>Delete</button>
      <hr />
    </div>
  );
};

export default TaskItem;
