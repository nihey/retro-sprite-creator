import React from 'react'
import classNames from 'classnames'
import md5 from 'md5'

export default function CharacterThumbnail ({ paths, active, onClick }) {
  const filename = md5(paths.join('|'))
  const filepath = `/images/thumbnails/${filename}.png`

  return (
    <>
      <img
        className={classNames('character-thumbnail', { active })}
        src={filepath}
        onClick={onClick}
      />
      <style jsx>{`
        .character-thumbnail {
          cursor: pointer;
          width: 32px;
          height: 32px;
          background: var(--color-low-emphasis);
          padding: 4px;
          margin: 4px;
          border-radius: 4px;
          transition: background 0.1s ease-in-out;
        }

        .character-thumbnail:hover {
          background: var(--color-high-emphasis);
        }

        .character-thumbnail.active {
          background: #fff;
          box-shadow: 0 0 5px #fff;
        }
      `}</style>
    </>
  )
}
