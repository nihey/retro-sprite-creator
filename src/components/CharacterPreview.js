import React from 'react'
import classNames from 'classnames'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import getURL from '../util/getURL'
import createPreview from '../util/createPreview'
import SpriteSheetPreview from './SpriteSheetPreview'
import ConditionallyRender from './ConditionallyRender'
import Dropdown from './Dropdown'
import Dimmer from './Dimmer'
import TetrominoLoader from './TetrominoLoader'

const getLocationHref = () => {
  if (typeof location === 'undefined') {
    return null
  }

  return location.href
}

const getFacebookURL = () => getURL('http://www.facebook.com/share.php', {
  u: getLocationHref()
})

const getTwitterURL = () => getURL('https://twitter.com/intent/tweet', {
  text: getLocationHref()
})

export default function CharacterPreview ({ characterSettings, settingsString }) {
  const canvas = React.useRef(null)
  const [spriteSheet, setSpriteSheet] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const isHidden = React.useMemo(() => !characterSettings, [characterSettings])

  React.useEffect(() => {
    const canvasElement = canvas.current
    if (!canvasElement || !characterSettings) {
      return
    }

    setLoading(true)
    const { base, ...settings } = characterSettings
    createPreview(canvasElement, base, settings).then((newSpriteSheet) => {
      setSpriteSheet(newSpriteSheet)
      setLoading(false)
    })
  }, [characterSettings])

  return (
    <div className="character-preview">
      <SpriteSheetPreview spriteSheet={spriteSheet} loading={loading}/>
      <div className="canvascontainer">
        <canvas
          ref={canvas}
          className="canvas"
          width={32 * 3}
          height={32 * 4}
        />
        {loading && <Dimmer><TetrominoLoader size="sm"/></Dimmer>}
      </div>
      <div className="actions">
        <Dropdown
          className="download"
          loading={loading}
          options={[
            {
              Component: 'a',
              href: spriteSheet,
              download: 'sprite-sheet.png',
              children: 'Sprite Sheet'
            },
            {
              Component: 'a',
              href: `https://retro-image-server.nihey.org/animation/${settingsString}/full`,
              children: 'Sprite GIF'
            }
          ]}
        >
          Download
        </Dropdown>
      </div>
      <ConditionallyRender client>
        <div className="share">
          <span className="label">Share</span>
          <div className="options">
            {[
              ['fab fa-facebook-f', getFacebookURL()],
              ['fab fa-twitter', getTwitterURL()]
            ].map(([className, href]) => {
              return (
                <a
                  key={className}
                  href={href}
                  className={classNames('button', { loading })}
                  target="_blank"
                  rel="noreferrer"
                >
                  { loading ? <TetrominoLoader size="xs" /> : <i className={className}/>}
                </a>
              )
            })}
            <button
              className={classNames('button', { loading })}
              onClick={async () => {
                try {
                  await copy(location.href)
                  toast('Link copied to clipboard')
                } catch (e) {
                }
              }}
            >
              { loading ? <TetrominoLoader size="xs" /> : <i className="fa fa-link"/>}
            </button>
          </div>
        </div>
      </ConditionallyRender>
      <style jsx>{`
        .character-preview {
          position: fixed;
          top: 0;
          left: 0;
          display: ${isHidden ? 'none' : 'flex'};
          flex-direction: column;
          align-items: center;
          width: 160px;
          padding: 32px 0;

          .canvascontainer {
            position: relative;
          }

          .canvas {
            background: #fff;
            border-radius: 4px;
            padding: 4px;
          }

          .actions {
            margin-top: 24px;
          }

          :global(.download) {
            position: relative;
            min-width: 110.36px;
            min-height: 32px;
          }

          .share {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .label {
              margin-bottom: 8px;
            }

            .options {
              display: flex;
              padding-top: 8px;

              .button {
                position: relative;
                margin: 0 4px;
                width: 32px;
                height: 32px;
              }
            }
          }

          @media (max-width: 600px) {
            top: unset;
            bottom: 0;

            .canvascontainer {
              display: none;
            }

            .actions {
              margin-top: 0;
            }

            .label {
              display: none;
            }

            .share .options {
              padding-top: 0px;
            }
          }
        }
      `}</style>
    </div>
  )
}
