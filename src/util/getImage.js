const getImage = async (imageURL) => {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    const image = new Image()
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = imageURL
    })
  }

  const { Image: ImagePonyFill } = require('canvas')
  const image = new ImagePonyFill()
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image)
    image.onerror = reject

    // eslint-disable-next-line
    const imagePath = path.join(__dirname, '..', '..', 'public', imageURL)
    // eslint-disable-next-line
    image.src = fs.readFileSync(imagePath)
  })
}

export default getImage
