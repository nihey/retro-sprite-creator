// Code used from "Chibi.Center"

const fs = require('fs')
const path = require('path')

const { createCanvas, Image } = require('canvas')
const md5 = require('md5')
const gracefulFs = require('graceful-fs')
gracefulFs.gracefulify(fs)

function readDir (dirPath) {
  return fs.readdirSync(path.join(__dirname, '../public/images/creator/', dirPath)).map(f => (
    f.split('.')[0]
  ))
}

const parseDir = function (dirPath) {
  const files = readDir(dirPath)
  const parsed = {}
  files.forEach(function (file) {
    const key = file.replace(/_back|_front/g, '')
    parsed[key] = parsed[key] || {}

    // Back part
    if (file.match(/_back/)) {
      parsed[key].back = file
      return
    }

    parsed[key].front = file
  })

  return Object.keys(parsed).map(k => parsed[k])
}

console.info('Generating Sprite Map...')
const spriteMap = {
  base: {
    male: parseDir('base/male'),
    female: parseDir('base/female')
  },
  hair: {
    male: parseDir('hair/male'),
    female: parseDir('hair/female')
  },
  'hair-front': {
    male: parseDir('hair-front/male'),
    female: parseDir('hair-front/female')
  },
  'hair-back': {
    male: parseDir('hair-back/male'),
    female: parseDir('hair-back/female')
  },
  body: {
    male: parseDir('body/male'),
    female: parseDir('body/female')
  },
  armor: {
    unissex: parseDir('armor/unissex')
  },
  accessory: {
    unissex: parseDir('accessory/unissex'),
    male: parseDir('accessory/male'),
    female: parseDir('accessory/female')
  },
  mantle: {
    unissex: parseDir('mantle/unissex')
  },
  wing: {
    unissex: parseDir('wing/unissex')
  }
}

let count = 0
function build (paths, sy = 0) {
  count += 1

  // Create a canvas
  const canvas = createCanvas(32, 32)
  const context = canvas.getContext('2d')

  // Join all images on the correct order
  paths.forEach(function (filename) {
    const image = new Image()
    console.log('opening', filename)
    image.src = fs.readFileSync(path.join(__dirname, '../public/images/creator/', `${filename}.png`))
    context.drawImage(image, 32, sy, 32, 32, 0, 0, 32, 32)
  })

  // Save the thumbnail
  const buffer = canvas.toBuffer()
  const thumbnailName = md5(paths.join('|')) + '.png'
  const thumbnailPath = path.join(__dirname, '../public/images/thumbnails/', thumbnailName)
  fs.writeFileSync(thumbnailPath, buffer)
}

fs.writeFileSync(
  path.join(__dirname, '../src/constants/SpriteMap.json'),
  JSON.stringify(spriteMap, null, 2)
)

// Blank thumbnail
build(['blank'])

// Iterate over all bases
Object.keys(spriteMap.base).forEach(function (baseGender) {
  spriteMap.base[baseGender].forEach(function (base) {
    base = base.front

    // Base thumbnails (displayed at the top of the page)
    build(['base/' + baseGender + '/' + base]);

    // Iterate over all groups
    [
      'hair', 'hair-front', 'hair-back', 'body', 'armor', 'accessory', 'mantle',
      'wing'
    ].forEach(function (group) {
      // Iterate over all group genders (male, female and unissex)
      Object.keys(spriteMap[group]).forEach(function (groupGender) {
        if (groupGender === 'unissex' || groupGender === baseGender) {
          // Iterate over all group elements
          spriteMap[group][groupGender].forEach(function (e) {
            console.info('Combining', baseGender, base, group, groupGender, e)
            build([
              e.back ? group + '/' + groupGender + '/' + e.back : 'blank',
              'base/' + baseGender + '/' + base,
              group + '/' + groupGender + '/' + e.front
            ], group === 'hair-back' || group === 'wing' ? 96 : 0)
          })
        }
      })
    })
  })
})

console.info('Built', count, 'combinations')
