module.exports = {
  env: {
    ENVIRONMENT: process.env.NODE_ENV,
    THUMBNAIL_BASE_URL: process.env.THUMBNAIL_BASE_URL || 'http://localhost:3000/images/thumbnails/'
  }
}
