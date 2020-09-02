import OrderedSections from '../constants/OrderedSections.json'
import getImage from '../util/getImage'
import currentTabToBeFocused from '../util/currentTabToBeFocused'

const getImageURL = (path) => {
  return `/images/creator/${path}.png`
}

const getImageFromPath = async (path) => {
  const imageURL = getImageURL(path)
  return getImage(imageURL)
}

const getImageListFromPath = async (pathList) => {
  const imageListPromise = pathList.map(path => getImageFromPath(path))
  return Promise.all(imageListPromise)
}

const getAccessories = (settings) => {
  const accessories = OrderedSections.map(section => {
    return settings[section]
  }).filter(v => v)

  return accessories
}

const createPreview = async (canvas, base, settings) => {
  const context = canvas.getContext('2d')

  const accessories = getAccessories(settings)

  const backAccessories = accessories.map(([backPath = 'blank']) => backPath)
  const frontAccessories = accessories.map(([_, __, frontPath = 'blank']) => frontPath)

  const backImagesPromise = getImageListFromPath(backAccessories)
  const frontImagesPromise = getImageListFromPath(frontAccessories)

  const backImages = await backImagesPromise
  const frontImages = await frontImagesPromise
  const baseImage = await getImageFromPath(base)

  // Canvas commands will only be flushed to canvas element when the user is
  // focusing the current tab
  await currentTabToBeFocused()

  context.clearRect(0, 0, canvas.width, canvas.height)

  backImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })

  context.drawImage(baseImage, 0, 0)

  frontImages.forEach((image) => {
    context.drawImage(image, 0, 0)
  })

  return canvas.toDataURL('image/png')
}

export default createPreview
