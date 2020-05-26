import React from 'react'
import Head from 'next/head'

import RawSpriteMap from '../src/constants/SpriteMap.json'
import Row from '../src/components/Row'
import CharacterThumbnail from '../src/components/CharacterThumbnail'
const { base: BaseSpriteMap, ...SpriteMap } = RawSpriteMap

export default function Index () {
  const [selectedBase, setSelectedBase] = React.useState('base/male/color-0')
  const [selectedAccessories, setSelectedAccessories] = React.useState({})
  const selectedGender = React.useMemo(() => selectedBase.split('/')[1], [selectedBase])
  const baseGenders = React.useMemo(() => Object.entries(BaseSpriteMap), [])
  const sections = React.useMemo(() => Object.entries(SpriteMap), [])

  return (
    <div>
      <Head>
        <title>Retro Sprite Creator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {baseGenders.map(([gender, options]) => {
        return (
          <Row key={gender}>
            {options.map((option, i) => {
              const path = `base/${gender}/${option.front}`
              return (
                <CharacterThumbnail
                  key={i}
                  paths={[path]}
                  active={path === selectedBase}
                  onClick={() => {
                    const newGender = path.split('/')[1]
                    if (selectedGender !== newGender) {
                      setSelectedAccessories({})
                    }
                    setSelectedBase(path)
                  }}
                />
              )
            })}
          </Row>
        )
      })}
      {sections.map(([section, GenderMap]) => {
        const genders = Object.entries(GenderMap).filter(([gender]) => (
          gender === selectedGender || gender === 'unissex'
        ))
        const blankOption = [['unissex', [{}]]]
        const gendersWithBlank = blankOption.concat(genders)

        return (
          <Row key={section}>{
            gendersWithBlank.map(([gender, options]) => {
              return options.map((option, i) => {
                const getOptionPath = (optionSide) => {
                  if (!optionSide) {
                    return 'blank'
                  }
                  return `${section}/${gender}/${optionSide}`
                }

                const isBlank = !option.front && !option.back
                const front = getOptionPath(option.front)
                const back = getOptionPath(option.back)
                const paths = isBlank ? ['blank'] : [back, selectedBase, front]

                const selectedAccessory = selectedAccessories[section]
                const isSelected = (
                  selectedAccessory &&
                  selectedAccessory.join('|') === paths.join('|')
                )
                const isNotSelectedAndBlank = !selectedAccessory && isBlank
                const isActive = isSelected || isNotSelectedAndBlank
                return (
                  <CharacterThumbnail
                    key={i}
                    paths={paths}
                    active={isActive}
                    onClick={() => setSelectedAccessories({
                      ...selectedAccessories,
                      [section]: isBlank ? null : paths
                    })}
                  />)
              })
            })}
          </Row>
        )
      })}
    </div>
  )
}
