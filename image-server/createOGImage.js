import { createCanvas } from 'canvas'

import cropPointsList from '../src/constants/cropPointsList'
import getImage from '../src/util/getImage'
import createPreview from '../image-server/createPreview'

export default async function createOGImage (base, settings) {
  const spriteSheetImageString = await createPreview(base, settings)
  const spriteSheetImage = await getImage(spriteSheetImageString)

  const canvas = createCanvas(64, 64)
  const context = canvas.getContext('2d')

  context.clearRect(0, 0, canvas.width, canvas.height)
  cropPointsList.forEach((cropPoints, i) => {
    const [x, y] = [
      [0, 0],
      [32, 0],
      [0, 32],
      [32, 32]
    ][i]
    const [sx, sy, sWidth, sHeight] = cropPoints[1]

    context.drawImage(spriteSheetImage, sx, sy, sWidth, sHeight, x, y, sWidth, sHeight)
  })

  return canvas.toDataURL('image/png')
}
