export default function isAbleToShare () {
  if (typeof window === 'undefined') {
    return false
  }

  return Boolean(navigator.share)
}
