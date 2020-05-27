import React from 'react'

export default function Row ({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  flexWrap = 'wrap',
  marginBottom = 0
}) {
  return (
    <div className="rsc-row">
      { children }

      <style jsx>{`
        .rsc-row {
          display: flex;
          flex-direction: row;
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          flex-wrap: ${flexWrap};
          padding: 8px;
          margin-bottom: ${marginBottom}px;
        }

        .rsc-row > * {
          margin: 0 20px;
        }
      `}</style>
    </div>
  )
}
