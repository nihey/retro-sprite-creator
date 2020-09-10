import React from 'react'
import classNames from 'classnames'

import TetrominoLoader from './TetrominoLoader'

export default function Button ({
  Component = 'button',
  loading = false,
  children,
  className,
  ...props
}) {
  return (
    <Component
      className={classNames('button', { loading }, className)}
      {...props}
    >
      { loading ? <TetrominoLoader size="xs" /> : children}
    </Component>
  )
}
