export default function deserializeObject (string) {
  try {
    const normalizedString = string.replace(/\|/g, '/')
    const decompressedObjectJSON = atob(normalizedString)
    const object = JSON.parse(decompressedObjectJSON)
    return object
  } catch (e) {
    return null
  }
};
