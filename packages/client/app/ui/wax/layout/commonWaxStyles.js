import { css } from 'styled-components'
import { th } from '@coko/client'

export default css`
  font-family: '${th('fontInterface')}';
  font-size: ${th('fontSizeBase')};

  color: ${th('colorPrimary')};

  *:focus:not(.ProseMirror) {
    outline: 1px solid ${th('colorPrimary')};
  }

  .ProseMirror {
    font-family: '${th('fontInterface')}';
    font-size: ${th('fontSizeBase')};
  }

  .ProseMirror-selectednode {
    outline: 2px solid ${th('colorPrimary')};
  }

  .ProseMirror ::selection {
    background-color: ${th('colorSelection')};
    color: #000;
  }

  /* this is a rough fix for the first cursor position when the first paragraph is empty */
.ProseMirror > .ProseMirror-yjs-cursor:first-child {
  margin-top: 16px;
}
.ProseMirror p:first-child, .ProseMirror h1:first-child, .ProseMirror h2:first-child, .ProseMirror h3:first-child, .ProseMirror h4:first-child, .ProseMirror h5:first-child, .ProseMirror h6:first-child {
  margin-top: 16px
}
/* This gives the remote user caret. The colors are automatically overwritten*/
.ProseMirror-yjs-cursor {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-color: orange;
  word-break: normal;
  pointer-events: none;
}
/* This renders the username above the caret */
.ProseMirror-yjs-cursor > div {
  position: absolute;
  top: -1.05em;
  left: -1px;
  font-size: 13px;
  background-color: rgb(250, 129, 0);
  font-family: serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  white-space: nowrap;
}
`
