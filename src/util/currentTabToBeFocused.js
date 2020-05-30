
export default async function currentTabToBeFocused () {
  const Visibility = require('visibilityjs')
  return new Promise((resolve) => {
    Visibility.onVisible(resolve)
  })
}
