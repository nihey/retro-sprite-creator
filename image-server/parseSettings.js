import deserializeObject from '../src/util/deserializeObject'

export default function parseSettings (settingsString) {
  try {
    return JSON.parse(settingsString)
  } catch (e) {
    return deserializeObject(settingsString)
  }
}
