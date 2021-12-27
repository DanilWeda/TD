import React from 'react';
import classNames from 'classnames';
import Badge from '../Badge/Badge';
import axios from 'axios';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemoveable, onClick, onRemove }) => {
  const ifRemove = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
		 axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
			onRemove(item.id);
		 })
      
		
    }
  };

  return (
    <ul onClick={onClick} className='list'>
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name}></Badge>}</i>
          <span>{item.name}</span>
          {isRemoveable && (
            <img
              onClick={() => ifRemove(item)}
              className='list__remove-icon'
              src={removeSvg}
              alt='Remove icon'
            />
          )}
        </li>
      ))}
    </ul>
  );
};



export default List;
