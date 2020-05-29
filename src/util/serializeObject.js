export default function serializeObject (object) {
  const objectJSON = JSON.stringify(object)
  const compressedObjectJSON = btoa(objectJSON)
  return compressedObjectJSON.replace(/\//g, '|')
};
