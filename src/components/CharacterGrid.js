import React from 'react'

import OrderedSections from '../constants/OrderedSections.json'
import RawSpriteMap from '../constants/SpriteMap.json'
import Row from './Row'
import CharacterThumbnail from './CharacterThumbnail'
const { base: BaseSpriteMap, ...SpriteMap } = RawSpriteMap

export default function CharacterGrid ({ characterSettings, onChange }) {
  const {
    base: selectedBase,
    ...selectedAccessories
  } = characterSettings

  const selectedGender = React.useMemo(() => selectedBase.split('/')[1], [selectedBase])
  const baseGenders = React.useMemo(() => Object.entries(BaseSpriteMap), [])
  const sections = React.useMemo(() => {
    return OrderedSections.map(section => {
      return [section, SpriteMap[section]]
    })
  }, [])

  return (
    <div className="character-grid">
      <div className="base">
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
                        onChange({ base: path })
                        return
                      }
                      onChange({
                        ...characterSettings,
                        base: path
                      })
                    }}
                  />
                )
              })}
            </Row>
          )
        })}
      </div>
      {sections.map(([section, GenderMap]) => {
        const genders = Object.entries(GenderMap).filter(([gender]) => (
          gender === selectedGender || gender === 'unissex'
        ))
        const blankOption = [['unissex', [{}]]]
        const gendersWithBlank = blankOption.concat(genders)

        return (
          <Row key={section} marginBottom={16}>{
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
                    onClick={() => onChange({
                      ...characterSettings,
                      [section]: isBlank ? undefined : paths
                    })}
                  />)
              })
            })}
          </Row>
        )
      })}
      <style jsx>{`
        .character-grid {
          display: flex;
          flex-direction: column;
          padding: 0 160px;

          .base {
            margin-bottom: 32px;
          }

          @media (max-width: 600px) {
            padding: 0px;
            padding-bottom: 230px;
          }
        }
      `}</style>
    </div>
  )
}
