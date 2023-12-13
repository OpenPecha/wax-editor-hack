import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery , gql } from '@apollo/client'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Wax } from 'wax-prosemirror-core'

import { useHistory } from 'react-router-dom'
import usePrintArea from './usePrintArea'
import config from './config/config'
import layout from './layout'
import YjsContext from '../../yjsProvider'

const WaxStyled = styled(Wax)``

const GET_DOCUMENT = gql`
  query GetDocument($identifier: ID!) {
    getDocument(identifier: $identifier) {
      id
      identifier
      owner {
        id
      }
    }
  }
`

const renderImage = file => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150)
  })
}

const PmEditor = ({ docIdentifier }) => {
  const history = useHistory()
  const { createYjsProvider, yjsProvider, ydoc, yjsCurrentUser } = useContext(YjsContext)
  const [readonly, setReadOnly] = useState(false)
 
  const { refElement } = usePrintArea({})

  const [ getDocument ] = useLazyQuery(GET_DOCUMENT, {
    variables: {
      identifier: docIdentifier ,
    },
    onCompleted: ({ getDocument: doc }) => {
      setReadOnly(doc.owner ? !(doc.owner.id === yjsCurrentUser.id) : false)
    },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    createYjsProvider(docIdentifier)
    getDocument({variables: { identifier }})
  }, [])

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
        readonly={readonly}
        ref={refElement}
        scrollThreshold={50}
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
