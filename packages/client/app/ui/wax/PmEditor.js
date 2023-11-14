import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Wax } from 'wax-prosemirror-core'

import { useHistory } from 'react-router-dom'
import usePrintArea from './usePrintArea'
import config from './config/config'
import layout from './layout'
import YjsContext from '../../yjsProvider'

const WaxStyled = styled(Wax)``

const user = {
  userId: 'b3cfc28e-0f2e-45b5-b505-e66783d4f946',
  userColor: {
    addition: 'royalblue',
    deletion: 'indianred',
  },
  username: 'admin',
}

const renderImage = file => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150)
  })
}

const PmEditor = props => {
  const history = useHistory()
  const { createYjsProvider, yjsProvider, ydoc } = useContext(YjsContext)

  const { refElement } = usePrintArea({})

  useEffect(() => {createYjsProvider(docIdentifier)}, [])

  const { docIdentifier } = props

  let identifier = docIdentifier

  if (!docIdentifier) {
    identifier = Array.from(Array(20), () =>
      Math.floor(Math.random() * 36).toString(36),
    ).join('')

    history.push(`/${identifier}`, { replace: true })
    return true
  }
  

  if (!yjsProvider || !ydoc ) return null

  return (
      <WaxStyled
        config={config(yjsProvider, ydoc)}
        fileUpload={file => renderImage(file)}
        layout={layout}
        placeholder="Type Something ..."
        ref={refElement}
        scrollThreshold={50}
        user= {user}
      />
  )
}

PmEditor.propTypes = {
  docIdentifier: PropTypes.string,
}

PmEditor.defaultProps = {
  docIdentifier: null,
}

export default PmEditor
