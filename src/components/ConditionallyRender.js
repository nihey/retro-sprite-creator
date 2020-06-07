import React from 'react'

const ConditionallyRender = ({ children, client, server }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => setIsMounted(true), [])

  if (!isMounted && client) {
    return null
  }

  if (isMounted && server) {
    return null
  }

  return children
}

export default ConditionallyRender
