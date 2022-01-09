import React from 'react'
import classNames from 'classnames'
import Badge from '../Badge/Badge'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './List.scss'
import removeSvg from '../../assets/img/remove.svg'

const List = ({
  items,
  isRemoveable,
  onClick,
  onRemove,
  isActive,
  isRoute,
  isRouteTitle,
}) => {
  const ifRemove = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <ul onClick={onClick} className={isRoute ? 'list over' : 'list'}>
      {items.map((item, index) =>
        isRoute ? (
          <Link key={index} to={`/lists/${item.id}`}>
            <li
              key={index}
              className={classNames(item.className, {
                active: item.active
                  ? item.active
                  : isActive && isActive.id === item.id,
              })}>
              <i>
                {item.icon ? (
                  item.icon
                ) : (
                  <Badge color={item.color.name}></Badge>
                )}
              </i>
              <span>
                {item.name}
                {item.tasks ? `(${item.tasks.length})` : '(0)'}
              </span>
              {isRemoveable && (
                <img
                  onClick={() => ifRemove(item)}
                  className='list__remove-icon'
                  src={removeSvg}
                  alt='Remove icon'
                />
              )}
            </li>
          </Link>
        ) : isRouteTitle ? (
          <Link key={index} to={`/`}>
            <li
              key={index}
              className={classNames(item.className, {
                active: item.active
                  ? item.active
                  : isActive && isActive.id === item.id,
              })}>
              <i>
                {item.icon ? (
                  item.icon
                ) : (
                  <Badge color={item.color.name}></Badge>
                )}
              </i>
              <span>
                {item.name}
                {item.tasks && `(${item.tasks.length})`}
              </span>
              {isRemoveable && (
                <img
                  onClick={() => ifRemove(item)}
                  className='list__remove-icon'
                  src={removeSvg}
                  alt='Remove icon'
                />
              )}
            </li>
          </Link>
        ) : (
          <li
            key={index}
            className={classNames(item.className, {
              active: item.active
                ? item.active
                : isActive && isActive.id === item.id,
            })}>
            <i>
              {item.icon ? item.icon : <Badge color={item.color.name}></Badge>}
            </i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemoveable && (
              <img
                onClick={() => ifRemove(item)}
                className='list__remove-icon'
                src={removeSvg}
                alt='Remove icon'
              />
            )}
          </li>
        ),
      )}
    </ul>
  )
}

export default List
