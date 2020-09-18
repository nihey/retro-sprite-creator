import fs from 'fs'
import path from 'path'

import sharp from 'sharp'
import mkdirp from 'mkdirp'
import moveFile from 'move-file'
import dataURLToFile from './dataURLToFile'
import createOGImage from './createOGImage'
import createPreview from './createPreview'
import parseSettings from './parseSettings'
import createGIF from './createGIF'

const PREFIX = path.join(__dirname, '..', 'built-images')

export default async function createImageKit (settingsString) {
  const { base, ...settings } = parseSettings(settingsString)

  const basePath = path.join(PREFIX, settingsString)
  mkdirp.sync(basePath)

  const faviconFilepath = path.join(basePath, 'favicon.png')
  const ogImageFilepath = path.join(basePath, 'og-image.png')
  const spriteSheetFilepath = path.join(basePath, 'spritesheet.png')
  const fullAnimationFilepath = path.join(basePath, 'full-animation.gif')

  const isAlreadyCreated = (
    fs.existsSync(faviconFilepath) &&
    fs.existsSync(ogImageFilepath) &&
    fs.existsSync(spriteSheetFilepath) &&
    fs.existsSync(fullAnimationFilepath)
  )
  if (isAlreadyCreated) {
    return {
      faviconFilepath,
      ogImageFilepath,
      spriteSheetFilepath,
      fullAnimationFilepath
    }
  }

  const ogImageString = await createOGImage(base, settings)
  const ogImageBuffer = Buffer.from(ogImageString.split(',')[1], 'base64')
  await sharp(ogImageBuffer).resize(200, 200).toFile(ogImageFilepath)

  const spriteSheetImageString = await createPreview(base, settings)
  dataURLToFile(spriteSheetImageString, spriteSheetFilepath)

  await sharp(spriteSheetFilepath).extract({
    left: 32,
    top: 64,
    width: 32,
    height: 32
  }).toFile(faviconFilepath)

  const gifPath = await createGIF(base, settings)
  await moveFile(gifPath, fullAnimationFilepath)

  return {
    faviconFilepath,
    ogImageFilepath,
    spriteSheetFilepath,
    fullAnimationFilepath
  }
}
