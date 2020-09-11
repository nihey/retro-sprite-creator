import React from 'react'
import classNames from 'classnames'

import TetrominoLoader from './TetrominoLoader'

export default function Button ({
  Component = 'button',
  loading = false,
  children,
  className,
  active = false,
  ...props
}) {
  return (
    <Component
      className={classNames('button', { loading, active }, className)}
      {...props}
    >
      { loading ? <TetrominoLoader size="xs" /> : children}
    </Component>
  )
}
