import parseSettings from '../image-server/parseSettings'
import createGIF from '../image-server/createGIF'

async function main () {
  const fullSettings = parseSettings(process.argv[2])
  if (!fullSettings) {
    console.log('Could not parse any settings')
    process.exit(1)
  }

  const { base, ...settings } = fullSettings
  const gifPath = await createGIF(base, settings)
  console.log('Done at:', gifPath)
}

main()
