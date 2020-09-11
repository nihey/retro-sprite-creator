import React from 'react'
import { CSSTransition } from 'react-transition-group'

import Button from './Button'

export default function Dropdown ({
  loading = false,
  className,
  children,
  transition = 300,
  options = [],
  ...props
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="dropdown">
      <Button
        active={open}
        className={className}
        loading={loading}
        onClick={() => setOpen(!open)}
      >
        { children }
      </Button>
      <div className="dropdown-menu-container">
        <CSSTransition
          in={open}
          timeout={transition}
          classNames="dropdown-menu"
          unmountOnExit
        >
          <div>
            {options.map((option, i) => {
              return (
                <div className="dropdown-menu-item" key={i}>
                  <Button
                    {...option}
                    onClick={(...args) => {
                      setOpen(false)

                      if (option.onClick) {
                        option.onClick(...args)
                      }
                    }}
                  />
                </div>
              )
            })}
          </div>
        </CSSTransition>
      </div>
      <style jsx>{`
        .dropdown {
          position: relative;
        }

        .dropdown-menu-container {
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translate(calc(100% + 8px));
        }

        .dropdown-menu-item {
          padding-bottom: 8px;

          &:last-child {
            padding-bottom: 0;
          }
        }

        :global(.dropdown-menu-enter) {
          opacity: 0;
          transform: scale(0.9);
        }

        :global(.dropdown-menu-enter-active) {
          opacity: 1;
          transform: scale(1);
          transition: opacity ${transition}ms, transform ${transition}ms;
        }

        :global(.dropdown-menu-exit) {
          opacity: 1;
        }

        :global(.dropdown-menu-exit-active) {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity ${transition}ms, transform ${transition}ms;
        }
      `}</style>
    </div>
  )
}
