import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Wax } from 'wax-prosemirror-core'

import { useHistory } from "react-router-dom";


import { config } from './config'
import { EditoriaLayout } from "./layout"

const EditorWrapper = styled.div`
  border: none;
  display: flex;
  flex: 2 1 auto;
  justify-content: left;
  margin-right: 15px;

  .ProseMirror {
    white-space: break-spaces;
    width: 100%;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }

    p.empty-node:first-child::before {
      content: attr(data-content);
    }

    .empty-node::before {
      color: rgb(170 170 170);
      float: left;
      font-style: italic;
      height: 0;
      pointer-events: none;
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

const PmEditor = props => {
  const history = useHistory();

  const { content, readonly, docIdentifier } = props

  let identifier = docIdentifier

  if (!docIdentifier) {
    identifier = [...Array(15).keys()].slice(1).map(() => {
      const random = Math.floor(Math.random() * 27);
      return String.fromCharCode(97 + random);
    }).join('')

    history.push(`/dashboard/${identifier}`, { replace: true });
    return true
  }


  return (
    <EditorWrapper>
      <Wax
        config={config(identifier)}
        fileUpload={file => renderImage(file)}
        layout={EditoriaLayout}
        placeholder="Type Something ..."
        readonly={readonly}
        value={content}
      />
    </EditorWrapper>
  )
}

PmEditor.propTypes = {
  docIdentifier: PropTypes.string,
  content: PropTypes.string,
  readonly: PropTypes.bool,
}

PmEditor.defaultProps = {
  docIdentifier: null,
  content: '',
  readonly: false,
}

export default PmEditor
