import shortHash from 'short-hash'

function getHashedObject (object) {
  return Object.entries(object).reduce((previous, [key, value]) => {
    if (!value) {
      return previous
    }

    if (!Array.isArray(value)) {
      value = [value]
    }

    return {
      ...previous,
      [key]: shortHash(value.join('|'))
    }
  }, {})
}

export default function serializeObject (object) {
  const hashedObject = getHashedObject(object)
  const objectJSON = JSON.stringify(hashedObject)
  const compressedObjectJSON = btoa(objectJSON)
  return compressedObjectJSON.replace(/\//g, '|')
};
