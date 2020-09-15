import React from 'react'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import getURL from '../util/getURL'
import createPreview from '../util/createPreview'
import SpriteSheetPreview from './SpriteSheetPreview'
import ConditionallyRender from './ConditionallyRender'
import Dropdown from './Dropdown'
import Dimmer from './Dimmer'
import Button from './Button'
import Modal from './Modal'
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
  const [showAbout, setShowAbout] = React.useState(false)
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
                <Button
                  Component="a"
                  key={className}
                  href={href}
                  loading={loading}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={className}/>
                </Button>
              )
            })}
            <Button
              loading={loading}
              onClick={async () => {
                await copy(location.href)
                toast('Link copied to clipboard')
              }}
            >
              <i className="fa fa-link"/>
            </Button>
          </div>
        </div>
      </ConditionallyRender>
      <div className="about">
        <Button onClick={() => setShowAbout(true)}>About</Button>
      </div>
      <Modal
        title="About"
        maxWidth="30vw"
        open={showAbout}
        onClose={() => setShowAbout(false)}
      >
        <p>
          Retro Sprite Creator is a free project built and maintained by
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://nihey.org/">nihey takizawa</a>.
          {' '}
        </p>
        <p>
          All Sprites here are available for Non-Commercial Projects, you just need to credit the original sprite designers:
        </p>
        <ul>
          <li>Famitsu</li>
          <li>EnterBrain</li>
        </ul>
        <p>
          My goal here is to provide a place where people can easily create
          custom sprites for their games.
        </p>
        <p>
          I&apos;ve developed some games on my college years and wish that
          something like this existed back then, so why not build and share one
          with the world?
        </p>
        <p>
          Do you have some Sprites that you would like to share and add to this website?
          {' '}
          <a rel="noopener noreferrer" target="_blank" href="mailto:nihey.takizawa@gmail.com">
            send me an email
          </a>.
        </p>
      </Modal>
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

              :global(.button) {
                position: relative;
                margin: 0 4px;
                width: 32px;
                height: 32px;
              }
            }
          }

          .about {
            padding-top: 12px;
            min-width: 110.36px;
            min-height: 32px;

            :global(.button) {
              width: 100%;
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
