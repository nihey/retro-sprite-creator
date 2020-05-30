import React from 'react'

const intensities = {
  high: 'var(--high-emphasis-opacity)',
  medium: 'var(--medium-emphasis-opacity)',
  low: 'var(--low-emphasis-opacity)'
}

export default function Dimmer ({ intensity = 'medium', children }) {
  return (
    <>
      <div className="dimmer"/>
      { children }
      <style jsx>{`
        .dimmer {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;

          background: black;
          opacity: ${intensities[intensity]};
        }
      `}</style>
    </>
  )
}
