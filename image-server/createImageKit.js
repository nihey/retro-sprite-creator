import fs from 'fs'
import path from 'path'

import md5 from 'md5'
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
  mkdirp.sync(PREFIX)

  const getFilePath = (filename) => {
    return path.join(PREFIX, filename)
  }

  const hashedSettingsString = md5(settingsString)
  const faviconFilepath = getFilePath(`favicon-${hashedSettingsString}.png`)
  const ogImageFilepath = getFilePath(`og-image-${hashedSettingsString}.png`)
  const spriteSheetFilepath = getFilePath(`spritesheet-${hashedSettingsString}.png`)
  const fullAnimationFilepath = getFilePath(`full-animation-${hashedSettingsString}.gif`)

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
