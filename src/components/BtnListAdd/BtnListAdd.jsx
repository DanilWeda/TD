import React, { useState, useEffect } from 'react';
import Badge from '../Badge/Badge';
import List from '../List';
import axios from 'axios'

import closeSvg from '../../assets/img/close.svg';

import './BtnListAdd.scss';

const BtnListAdd = ({ colors, onAdd }) => {

  const [visiable, setVisiable] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiable(false);
    setInputValue('');
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='add-btn'>
      <List
        onClick={() => {
          setVisiable(true);
        }}
        items={[
          {
            icon: (
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 1V11'
                  stroke='#868686'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1 6H11'
                  stroke='#868686'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ),
            name: 'Добавить список',
            className: 'list__add--button',
          },
        ]}
      />
      {visiable && (
        <div className='add-btn__popup'>
          <img
            onClick={onClose}
            className='add-btn__popup-close-btn'
            src={closeSvg}
            alt='Close button'
          />

          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className='field'
            type='text'
            placeholder='Название списка'
          />
          <div className='add-btn__popup-colors'>
            {colors.map((color) => (
              <Badge
                onClick={() => {
                  selectColor(color.id);
                }}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className='button'>
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BtnListAdd;
