import fs from 'fs'

export default function dataURLToFile (dataUrl, filename) {
  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64')
  fs.writeFileSync(filename, buffer)
}
