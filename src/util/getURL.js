export default function getURL (baseURL, params = {}) {
  const queryString = Object.entries(params).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&')

  if (!queryString) {
    return baseURL
  }

  return `${baseURL}?${queryString}`
}
