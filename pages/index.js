import React from 'react'
import Head from 'next/head'

import CharacterGrid from '../src/components/CharacterGrid'
import CharacterPreview from '../src/components/CharacterPreview'

export default function Index () {
  const [characterSettings, setCharacterSettings] = React.useState(null)

  return (
    <div>
      <Head>
        <title>Retro Sprite Creator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharacterGrid onChange={setCharacterSettings}/>
      <CharacterPreview characterSettings={characterSettings}/>
    </div>
  )
}
