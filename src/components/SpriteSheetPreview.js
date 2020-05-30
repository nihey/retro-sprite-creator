import React from 'react'

import getImage from '../util/getImage'
import Dimmer from './Dimmer'
import TetrominoLoader from './TetrominoLoader'

function useInterval (callback, delay) {
  const savedCallback = React.useRef()

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    function tick () {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function Sprite ({ spriteSheet, cropPoints, loading }) {
  const canvas = React.useRef(null)
  const cropIndexRef = React.useRef(0)

  useInterval(async () => {
    const canvasElement = canvas.current
    const cropPoint = cropPoints[cropIndexRef.current]
    if (!cropPoint || !canvasElement || !spriteSheet) {
      return
    }

    const [sx, sy, sWidth, sHeight] = cropPoint
    const context = canvasElement.getContext('2d')
    const spriteSheetImage = await getImage(spriteSheet)

    context.clearRect(0, 0, canvasElement.width, canvasElement.height)
    context.drawImage(spriteSheetImage, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight)

    cropIndexRef.current = (cropIndexRef.current + 1) % cropPoints.length
  }, 200)

  return (
    <div className="animated-sprite">
      <canvas ref={canvas} width={32} height={32}/>
      {loading && <Dimmer><TetrominoLoader size="xs"/></Dimmer>}
      <style jsx>{`
        .animated-sprite {
          position: relative;

          canvas {
            padding: 4px;
            border-radius: 4px;
            background: #fff;
            margin: 4px;
          }
        }
      `}</style>
    </div>
  )
}

const cropPointsList = [
  [
    [0, 0, 32, 32],
    [32, 0, 32, 32],
    [64, 0, 32, 32],
    [32, 0, 32, 32]
  ], [
    [0, 32, 32, 32],
    [32, 32, 32, 32],
    [64, 32, 32, 32],
    [32, 32, 32, 32]
  ], [
    [0, 64, 32, 32],
    [32, 64, 32, 32],
    [64, 64, 32, 32],
    [32, 64, 32, 32]
  ], [
    [0, 96, 32, 32],
    [32, 96, 32, 32],
    [64, 96, 32, 32],
    [32, 96, 32, 32]
  ]
]

export default function SpriteSheetPreview ({ spriteSheet, loading }) {
  return (
    <div className="spritesheet-preview">
      <div className="row">
        <Sprite
          spriteSheet={spriteSheet}
          loading={loading}
          cropPoints={cropPointsList[0]}
        />
        <Sprite
          spriteSheet={spriteSheet}
          loading={loading}
          cropPoints={cropPointsList[1]}
        />
      </div>
      <div className="row">
        <Sprite
          spriteSheet={spriteSheet}
          loading={loading}
          cropPoints={cropPointsList[2]}
        />
        <Sprite
          spriteSheet={spriteSheet}
          loading={loading}
          cropPoints={cropPointsList[3]}
        />
      </div>
      <style jsx>{`
        .spritesheet-preview {
          margin-bottom: 12px;

          .row {
            display: flex;
          }
        }
      `}</style>
    </div>
  )
}
