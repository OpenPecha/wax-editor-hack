import { css } from 'styled-components'
import { th } from '@coko/client'

export default css`
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};

  color: ${th('colorPrimary')};

  *:focus:not(.ProseMirror) {
    outline: 1px solid ${th('colorPrimary')};
  }

  .ProseMirror {
    font-family: ${th('fontInterface')};
    font-size: ${th('fontSizeBase')};
  }

  .ProseMirror-selectednode {
    outline: 2px solid ${th('colorPrimary')};
  }

  .ProseMirror ::selection {
    background-color: ${th('colorSelection')};
    color: #000;
}
`
