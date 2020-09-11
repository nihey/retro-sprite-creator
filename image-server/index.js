import express from 'express'

import createImageKit from './createImageKit'

const app = express()
const port = 4040

app.get('/og-image/:settingsString', async (req, res) => {
  const { ogImageFilepath } = await createImageKit(req.params.settingsString)
  res.download(ogImageFilepath, 'og-image.png')
})

app.get('/spritesheet/:settingsString', async (req, res) => {
  const { spriteSheetFilepath } = await createImageKit(req.params.settingsString)
  res.download(spriteSheetFilepath, 'sprite-sheet.png')
})

app.get('/animation/:settingsString/full', async (req, res) => {
  const { fullAnimationFilepath } = await createImageKit(req.params.settingsString)
  res.download(fullAnimationFilepath, 'sprite-animation.gif')
})

app.listen(port, () => {
  console.log(`Running image server on port ${port}`)
})
