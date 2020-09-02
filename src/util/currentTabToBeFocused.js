export default async function currentTabToBeFocused () {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    return
  }

  const Visibility = require('visibilityjs')
  return new Promise((resolve) => {
    Visibility.onVisible(resolve)
  })
}
