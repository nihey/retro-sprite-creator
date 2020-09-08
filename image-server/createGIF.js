import fs from 'fs'
import path from 'path'

import GIFEncoder from 'gifencoder'
import { createCanvas } from 'canvas'
import uid from 'uid'

import cropPointsList from '../src/constants/cropPointsList'
import getImage from '../src/util/getImage'
import createPreview from '../image-server/createPreview'

export default async function createGIF (base, settings) {
  const filename = `${uid(14)}.gif`
  const filepath = path.join('/', 'tmp', filename)

  const encoder = new GIFEncoder(64, 64)
  encoder.createReadStream().pipe(fs.createWriteStream(filepath))

  const spriteSheetImageString = await createPreview(base, settings)
  const spriteSheetImage = await getImage(spriteSheetImageString)

  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(200)
  encoder.setQuality(10)

  const canvas = createCanvas(64, 64)
  const context = canvas.getContext('2d');

  [0, 1, 2, 3].forEach(cropIndex => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    cropPointsList.forEach((cropPoints, i) => {
      const [x, y] = [
        [0, 0],
        [32, 0],
        [0, 32],
        [32, 32]
      ][i]
      const [sx, sy, sWidth, sHeight] = cropPoints[cropIndex]

      context.drawImage(spriteSheetImage, sx, sy, sWidth, sHeight, x, y, sWidth, sHeight)
    })
    encoder.addFrame(context)
  })

  encoder.finish()

  return filepath
}
