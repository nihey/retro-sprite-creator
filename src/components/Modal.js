import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import ConditionallyRender from './ConditionallyRender'
import Dimmer from './Dimmer'

function ModalBase ({
  title = 'Title',
  open,
  onClose = function () {},
  maxWidth = '100vw',
  transition = 130,
  children
}) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return
    }

    document.body.style.overflow = 'auto'
  }, [open])

  return ReactDOM.createPortal(
    <CSSTransition
      in={open}
      timeout={transition}
      classNames="modal-container"
      unmountOnExit
    >
      <>
        <div className="fixed-container">
          <Dimmer>
            <div
              className="modal-base"
              onClick={(event) => {
                const isClickOnOverlay = event.target === event.currentTarget
                if (isClickOnOverlay && onClose) {
                  onClose()
                }
              }}
            >
              <div className="modal">
                <h2 className="title">{ title }</h2>
                { children }
                <i className="close-icon fa fa-times" onClick={onClose}/>
              </div>
            </div>
          </Dimmer>
        </div>
        <style jsx>{`
          .fixed-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          :global(.modal-container-enter) {
            opacity: 0;
          }

          :global(.modal-container-enter-active) {
            opacity: 1;
            transition: opacity ${transition}ms;
          }

          :global(.modal-container-exit) {
            opacity: 1;
          }

          :global(.modal-container-exit-active) {
            opacity: 0;
            transition: opacity ${transition}ms;
          }

          .modal-base {
            color: var(--color-extra-dark);
            display: flex;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            justify-content: center;
            align-items: center;
            overflow: auto;
            padding: 20px;

            .modal {
              position: relative;
              cursor: unset;
              background: white;
              border-radius: 4px;
              padding: 20px;
              max-width: ${maxWidth};
              max-height: calc(100vh - 80px);
              overflow: auto;

              .title {
                margin: 0;
                margin-bottom: 15px;
              }

              .close-icon {
                position: absolute;
                top: 20px;
                right: 20px;
                opacity: 0.7;
                transition: opacity 0.1s ease-in-out;
                cursor: pointer;

                &:hover, &:active, &:focus {
                  opacity: 1;
                }
              }

              @media (max-width: 600px) {
                max-width: 100vw;
              }
            }
          }
        `}</style>
      </>
    </CSSTransition>,
    document.body
  )
}

export default function Modal (props) {
  return (
    <ConditionallyRender client>
      <ModalBase {...props}/>
    </ConditionallyRender>
  )
}
