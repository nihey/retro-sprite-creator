import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'
import moveFile from 'move-file'
import dataURLToFile from './dataURLToFile'
import createPreview from './createPreview'
import parseSettings from './parseSettings'
import createGIF from './createGIF'

const PREFIX = path.join(__dirname, '..', 'built-images')

export default async function createImageKit (settingsString) {
  const { base, ...settings } = parseSettings(settingsString)

  const basePath = path.join(PREFIX, settingsString)
  mkdirp.sync(basePath)

  const spriteSheetFilepath = path.join(basePath, 'spritesheet.png')
  const fullAnimationFilepath = path.join(basePath, 'full-animation.gif')

  const isAlreadyCreated = (
    fs.existsSync(spriteSheetFilepath) &&
    fs.existsSync(fullAnimationFilepath)
  )
  if (isAlreadyCreated) {
    return {
      spriteSheetFilepath,
      fullAnimationFilepath
    }
  }

  const spriteSheetImageString = await createPreview(base, settings)
  dataURLToFile(spriteSheetImageString, spriteSheetFilepath)

  const gifPath = await createGIF(base, settings)
  moveFile(gifPath, fullAnimationFilepath)

  return {
    spriteSheetFilepath,
    fullAnimationFilepath
  }
}
