import React, { useState } from 'react'

import axios from 'axios'

import addSvg from '../../assets/img/add.svg'

const AddTask = ({ list, onAddTask }) => {
  const [visibleForm, setForm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleFormVisible = () => {
    setForm(!visibleForm)
    setInputValue('')
  }

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/tasks/', obj)
      .then(({ data }) => {
        
        onAddTask(list.id, data)
        toggleFormVisible()
      })
      .catch(() => alert('Ошибка при добавлении'))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='tasks__form'>
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className='tasks__form-new'>
          <img src={addSvg} alt='Add icon' />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className='tasks__form-block'>
          <input
            value={inputValue}
            className='field'
            type='text'
            placeholder='Текст задачи'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className='button'>
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} className='button button--grey'>
            Отмена
          </button>
        </div>
      )}
    </div>
  )
}

export default AddTask
