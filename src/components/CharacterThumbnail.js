import React from 'react'
import classNames from 'classnames'
import md5 from 'md5'

import { THUMBNAIL_BASE_URL } from '../constants/Application'

export default function CharacterThumbnail ({ paths, active, onClick }) {
  const filename = md5(paths.join('|'))
  const filepath = `${THUMBNAIL_BASE_URL}${filename}.png`

  return (
    <>
      <img
        key={filepath}
        className={classNames('character-thumbnail', { active })}
        src={filepath}
        onClick={onClick}
      />
      <style jsx>{`
        .character-thumbnail {
          cursor: pointer;
          width: 32px;
          height: 32px;
          background: var(--color-medium-emphasis);
          padding: 4px;
          margin: 4px;
          border-radius: 4px;
          transition: background 0.1s ease-in-out;

          &:hover {
            background: var(--color-high-emphasis);
          }

          &.active {
            background: #fff;
            box-shadow: 0 0 5px #fff;
          }
        }
      `}</style>
    </>
  )
}
