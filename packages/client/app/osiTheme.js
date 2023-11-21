/* eslint-disable import/no-import-module-exports */
import { css } from 'styled-components'
import { th } from '@coko/client'

export default (theme) => {
  // eslint-disable-next-line no-param-reassign
  theme.cssOverrides.Wax = {
    ...theme.cssOverrides.Wax,
    ProseMirror: css`
      padding: 3em 8ch 3em;
    `,
    WaxSurfaceScroll: css`
      margin-left: 2%;
    `,
    CommentOuterBox: css`
      color: ${th('colorContent')};
      margin-left: -100px;
      padding: 0;
      margin-left: 20px;
      width: 600px;
    `,
    CommentItemWrapper: css`
      border: none;
      margin-bottom: 1em;
      margin-bottom: ${props => (props.active ? `1em` : `0`)};

      > div:not(:first-of-type) {
        margin-left: 16px;
      }
    `,
  }

  return theme
}
