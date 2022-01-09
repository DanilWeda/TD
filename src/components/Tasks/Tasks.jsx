import React from 'react'
import axios from 'axios'

import './Task.scss'
import penSvg from '../../assets/img/pen.svg'
import AddTask from './AddTask'
import OneTask from './Task'

const Task = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
}) => {
  const editTitle = () => {
    const newTitle = prompt('Название списка', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить названия списка')
        })
    }
  }

  return (
    <div className='tasks'>
      <h2 style={{ color: list.color.hex }} className='tasks__title'>
        {list.name}
        <img src={penSvg} alt='edit icon' onClick={editTitle} />
      </h2>

      <div className='tasks__items'>
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <OneTask
              list={list}
              key={task.id}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              {...task}
            />
          ))}
        <AddTask key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  )
}

export default Task
