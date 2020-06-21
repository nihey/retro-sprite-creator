import SpriteHashMap from '../constants/SpriteHashMap'
import atob from './atob'

function getDeHashedValue (key, value) {
  const deHashedValue = SpriteHashMap[key][value]
  if (!deHashedValue) {
    return deHashedValue
  }

  if (deHashedValue.length === 1) {
    return deHashedValue[0]
  }

  return deHashedValue
}

function getDeHashedObject (hashedObject) {
  return Object.entries(hashedObject).reduce((previous, [key, value]) => {
    return {
      ...previous,
      [key]: getDeHashedValue(key, value)
    }
  }, {})
}

export default function deserializeObject (string) {
  try {
    const normalizedString = string.replace(/\|/g, '/')
    const decompressedObjectJSON = atob(normalizedString)
    const hashedObject = JSON.parse(decompressedObjectJSON)
    const object = getDeHashedObject(hashedObject)
    return object
  } catch (e) {
    return null
  }
};
