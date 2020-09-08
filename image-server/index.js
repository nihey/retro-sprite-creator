import express from 'express'

import createImageKit from './createImageKit'

const app = express()
const port = 4040

app.get('/spritesheet/:settingsString', async (req, res) => {
  const { spriteSheetFilepath } = await createImageKit(req.params.settingsString)
  res.sendFile(spriteSheetFilepath)
})

app.get('/animation/:settingsString/full', async (req, res) => {
  const { fullAnimationFilepath } = await createImageKit(req.params.settingsString)
  res.sendFile(fullAnimationFilepath)
})

app.listen(port, () => {
  console.log(`Running image server on port ${port}`)
})
