import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import CharacterGrid from '../src/components/CharacterGrid'
import CharacterPreview from '../src/components/CharacterPreview'
import ProductHuntUpvotes from '../src/components/ProductHuntUpvotes'

import serializeObject from '../src/util/serializeObject'
import deserializeObject from '../src/util/deserializeObject'

export default function Index ({ defaultSettings }) {
  const router = useRouter()
  const settingsString = router.query.settings || defaultSettings

  const characterSettings = deserializeObject(settingsString) || {
    base: 'base/male/color-0'
  }

  const faviconURL = React.useMemo(() => {
    const isCharacterOnlyBase = Object.keys(characterSettings).length === 0
    if (isCharacterOnlyBase) {
      return '/favicon.ico'
    }

    return `https://retro-image-server.nihey.org/favicon/${settingsString}`
  }, [settingsString, characterSettings])

  const onChangeCharacterSettings = (newCharacterSettings) => {
    const serializedNewCharacterSettings = serializeObject(newCharacterSettings)
    router.push(
      `/character?settings=${serializedNewCharacterSettings}`,
      `/character/${serializedNewCharacterSettings}`,
      { shallow: true }
    )
  }

  return (
    <div>
      <Head>
        <title>Retro Sprite Creator</title>
        <link rel="icon" href={faviconURL} />
        <meta property="og:title" content="Retro Sprite Creator" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Quickly create excelent Sprites for your game here, for free!" />
        <meta property="og:image" content={`https://retro-image-server.nihey.org/og-image/${settingsString}`} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:url" content={`https://retro-sprite-creator.nihey.org/character/${settingsString}`} />
      </Head>
      <ProductHuntUpvotes/>
      <CharacterGrid
        characterSettings={characterSettings}
        onChange={onChangeCharacterSettings}
      />
      <CharacterPreview characterSettings={characterSettings} settingsString={settingsString} />
    </div>
  )
}

Index.getInitialProps = ({ query }) => {
  return { defaultSettings: query.settings }
}
