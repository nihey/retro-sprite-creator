import fs from 'fs'
import path from 'path'
import { createCanvas } from 'canvas'

import deserializeObject from '../src/util/deserializeObject'
import createPreview from '../src/util/createPreview'
global.fs = fs
global.path = path

function parseSettings (settingsString) {
  try {
    return JSON.parse(settingsString)
  } catch (e) {
    return deserializeObject(settingsString)
  }
}

async function main () {
  const fullSettings = parseSettings(process.argv[2])
  if (!fullSettings) {
    console.log('Could not parse any settings')
    process.exit(1)
  }

  const { base, ...settings } = fullSettings
  const canvas = createCanvas(96, 128)
  const preview = await createPreview(canvas, base, settings)
  console.log(preview)
}

main()
