import React from 'react'
import classNames from 'classnames'

import OrderedSections from '../constants/OrderedSections.json'
import getURL from '../util/getURL'
import getImage from '../util/getImage'
import SpriteSheetPreview from './SpriteSheetPreview'
import ConditionallyRender from './ConditionallyRender'
import currentTabToBeFocused from '../util/currentTabToBeFocused'
import Dimmer from './Dimmer'
import TetrominoLoader from './TetrominoLoader'

const getImageURL = (path) => {
  return `/images/creator/${path}.png`
}

const getImageFromPath = async (path) => {
  const imageURL = getImageURL(path)
  return getImage(imageURL)
}

const getImageListFromPath = async (pathList) => {
  const imageListPromise = pathList.map(path => getImageFromPath(path))
  return Promise.all(imageListPromise)
}

const getAccessories = (settings) => {
  const accessories = OrderedSections.map(section => {
    return settings[section]
  }).filter(v => v)

  return accessories
}

const createPreview = async (canvas, base, settings) => {
  const context = canvas.getContext('2d')

  const accessories = getAccessories(settings)

  const backAccessories = accessories.map(([backPath = 'blank']) => backPath)
  const frontAccessories = accessories.map(([_, __, frontPath = 'blank']) => frontPath)

  const backImagesPromise = getImageListFromPath(backAccessories)
  const frontImagesPromise = getImageListFromPath(frontAccessories)

  const backImages = await backImagesPromise
  const frontImages = await frontImagesPromise
  const baseImage = await getImageFromPath(base)

  // Canvas commands will only be flushed to canvas element when the user is
  // focusing the current tab
  await currentTabToBeFocused()

  context.clearRect(0, 0, canvas.width, canvas.height)

  backImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })

  context.drawImage(baseImage, 0, 0)

  frontImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })

  return canvas.toDataURL('image/png')
}

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

export default function CharacterPreview ({ characterSettings }) {
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
        <a
          href={spriteSheet}
          className={classNames('button download', { loading })}
          download="RetroSprite.png"
        >
          { loading ? <TetrominoLoader size="xs" /> : 'Download'}
        </a>
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

          .download {
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
        }
      `}</style>
    </div>
  )
}
