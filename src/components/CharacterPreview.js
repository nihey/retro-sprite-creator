import React from 'react'

const getImageURL = (path) => {
  return `/images/creator/${path}.png`
}

const getImage = async (path) => {
  const imageURL = getImageURL(path)
  const image = new Image()
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = imageURL
  })
}

const getImageListFromPath = async (pathList) => {
  const imageListPromise = pathList.map(path => getImage(path))
  return Promise.all(imageListPromise)
}

const getAccessories = (settings) => {
  const possibleSections = [
    'hair', 'hair-front', 'hair-back', 'body', 'armor', 'accessory', 'mantle',
    'wing'
  ]
  const accessories = possibleSections.map(section => {
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
  const baseImage = await getImage(base)

  context.clearRect(0, 0, canvas.width, canvas.height)

  backImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })

  context.drawImage(baseImage, 0, 0)

  frontImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })
}

export default function CharacterPreview ({ characterSettings }) {
  const canvas = React.useRef(null)
  const [spriteSheet, setSpriteSheet] = React.useState(null)
  const isHidden = React.useMemo(() => !characterSettings, [characterSettings])

  React.useEffect(() => {
    const canvasElement = canvas.current
    if (!canvasElement || !characterSettings) {
      return
    }

    const { base, ...settings } = characterSettings
    createPreview(canvasElement, base, settings).then(() => {
      const newSpriteSheet = canvasElement.toDataURL('image/png')
      setSpriteSheet(newSpriteSheet)
    })
  }, [characterSettings])

  return (
    <div className="character-preview">
      <canvas ref={canvas} className="canvas" width={32 * 3} height={32 * 4}/>
      <style jsx>{`
        .character-preview {
          position: fixed;
          top: 0;
          left: 0;
          display: ${isHidden ? 'none' : 'flex'};
          justify-content: center;
          width: 160px;
          padding: 32px 0;

          .canvas {
            background: #fff;
            border-radius: 4px;
            padding: 4px;
          }
        }
      `}</style>
    </div>
  )
}
