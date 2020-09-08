import fs from 'fs'
import path from 'path'
import { createCanvas } from 'canvas'

import createPreview from '../src/util/createPreview'
global.fs = fs
global.path = path

export default async function serverCreatePreview (base, settings) {
  const canvas = createCanvas(96, 128)
  return createPreview(canvas, base, settings)
}
