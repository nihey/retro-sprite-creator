import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import CharacterGrid from '../src/components/CharacterGrid'
import CharacterPreview from '../src/components/CharacterPreview'

import serializeObject from '../src/util/serializeObject'
import deserializeObject from '../src/util/deserializeObject'

export default function Index ({ defaultSettings }) {
  const router = useRouter()
  const settingsString = router.query.settings || defaultSettings
  const characterSettings = deserializeObject(settingsString) || {
    base: 'base/male/color-0'
  }

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharacterGrid
        characterSettings={characterSettings}
        onChange={onChangeCharacterSettings}
      />
      <CharacterPreview characterSettings={characterSettings}/>
    </div>
  )
}

Index.getInitialProps = ({ query }) => {
  return { defaultSettings: query.settings }
}
