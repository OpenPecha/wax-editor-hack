/* eslint-disable import/no-import-module-exports */
import { css } from 'styled-components'
import { th } from '@coko/client'

export default {
  colorContent: '#111',
  colorBackground: '#eee',
  colorContentBackground: '#f6f6f6',
  colorPrimary: '#525E76',
  // colorPrimary: '#36b',
  colorSecondary: '#E7E7E7',
  colorLightGrey: '#f7f7f7',
  colorReserve: 'white',
  colorLighterGrey: '#f9f9f9',
  colorFurniture: '#CCC',
  colorBorder: '#EBEBF0',
  colorBackgroundHue: '#FFFFFF',
  colorBackgroundTabs: 'gainsboro',
  // colorSuccess: '#008800',
  // colorError: 'indianred',
  colorTextReverse: '#FFF',
  colorTextPlaceholder: '#595959',
  // colorWarning: '#ffc107',
  colorBackgroundToolBar: '#fff',
  colorSelection: '#C5D7FE',
  colorBackgroundButton: '#0042C7',
  colorBody: 'white', // white
  colorTertiary: '#8ac341',
  colorSuccess: '#00763a',
  colorError: '#d43131',
  colorWarning: '#a65b00',
  colorText: '#525E76',
  colorTextDark: '#222222',
  colorAccept: '#27AA85',

  // font for the interface (menu ,button, etc.)
  fontInterface: 'InterVariable',
  fontFallbackInterface: 'Inter',
  // font for the branding (coko, text outside the box, etc.)
  fontBrand: 'MontserratVariable',
  fontFallbackBrand: 'Montserrat',
  //  font fot the Content itself (the editable text)
  // fontContent: 'RecursiveVariable',
  // fontFallbackContent: 'Recursive',

  fontContent: 'MontserratVariable',
  fontFallbackContent: 'Montserrat',

  // font sizes
  fontSizeBase: '18px',
  fontSizeBaseSmall: '16px',
  fontSizeHeading1: '96px',
  fontSizeHeading2: '81px',
  fontSizeHeading3: '54px',
  fontSizeHeading4: '36px',
  fontSizeHeading5: '24px',
  fontSizeHeading6: '18px',

  // line heights
  lineHeightBase: '30px',
  // lineHeightBaseSmall: '32px',
  // lineHeightHeading1: '96px',
  // lineHeightHeading2: '80px',
  // lineHeightHeading3: '59px',
  // lineHeightHeading4: '43px',
  // lineHeightHeading5: '28px',
  // lineHeightHeading6: '31px',

  // fontSizeBase: '1rem', // 16px
  // fontSizeBaseSmall: '0.875rem', // 14px

  gridUnit: '4px',

  borderRadius: '3px',
  borderWidth: '1px',
  borderStyle: 'solid',

  // #region header variables
  mobileLogoHeight: '100px',
  headerPaddingVertical: '16px',
  headerPaddingHorizontal: '24px',
  // #endregion header variables

  mediaQueries: {
    small: '600px',
    medium: '900px',
    mediumPlus: '1024px',
    large: '1200px',
  },
  cssOverrides: {
    Wax: {
      CreateTableWrapper: css`
        position: fixed;
      `,
      FindReplaceWrapper: css`
        position: fixed;
        top: unset;
      `,
      CommentOuterBox: css`
        color: ${th('colorContent')};
        margin-left: -100px;
        margin-left: ${props => (props.active ? `-150px` : `30px`)};
        width: ${props => (props.active ? `400px` : `200px`)};
        padding: 0;
      `,

      CommentWrapper: css`
        border-radius: 8px;
        padding: 0.8em 1.2ch;
        padding: ${props => (props.active ? `0.8em 1.2ch` : `.3em .5ch`)};
      `,
      CommentResolve: css`
        color: transparent;
        &:hover {
          color: ${th('colorPrimary')};
        }
        &::after {
          content: '✓';
          margin-left: 0.7ch;
          color: ${th('colorPrimary')};
          font-size: 1.5em;
          line-heigth: 1em;
        }
      `,
      CommentResolveWrapper: css`
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        color: transparent;
      `,
      CommentItemWrapper: css`
        border: none;
        margin-bottom: 1em;
        margin-bottom: ${props => (props.active ? `1em` : `0`)};
      `,
      CommentInfoWrapper: css`
        width: max-content;
        margin-bottom: 0.5em;
        display: block;
        border-bottom: 1px solid ${th('colorBackgroundTabs')};
        font-size: 0.9em;
      `,
      CommentName: css`
        font-size: 1em;
        display: inline;
        margin-right: 2ch;
        /*to hide the name, remove next 4 lines when the user name is setup*/
        color: transparent;
        visibility: none;
        width: 0;
        margin-left: -4.5ch;
        /*remove top of here*/
        &::after {
          color: ${th('colorPrimary')};
          content: 'comment';
          visibility: visible;
        }
      `,

      CommentTimestamp: css`
        font-size: 0.9em;
        /* display: inline; */
        font-style: italic;
        display: ${props => (props.active ? `inline` : `none`)};
      `,
      CommentContent: css`
        height: ${props => (props.active ? `unset` : `1.2em`)};
        font-size: 0.8em;
        line-height: 1.3;
        margin-top: 0.5em;
        text-overflow: ${props => (props.active ? `unset` : `ellipsis`)};
        overflow: ${props => (props.active ? `unset` : `hidden`)};
        white-space: ${props => (props.active ? `unset` : `nowrap`)};
        &:nth-of-type(even) {
          width: auto;
        }
      `,
      CommentReplyWrapper: css`
        border-top: unset;
      `,

      CommentTextArea: css`
        font-size: 0.9em;
        border: 3px solid ${th('colorLightGrey')};
        padding: 0.5em 1ch;
        margin: 0.5em 0;
        &:focus {
          border-color: ${th('colorBorder')};
          outline: none;
        }
        &::before {
          content: 'Reply';
          font-style: italic;
          display: block;
          margin-bottom: 0.4em;
        }
      `,
      CommentButtons: css`
        font-size: 14px;

        &:first-of-type {
          background: ${th('colorAccept')} !important;
        }
      `,
      CommentButtonGroup: css``,
      TransformToolWrapper: css`
        position: fixed;
        top: unset;
      `,
      HighlightToolWrapper: css`
        position: fixed;
        top: unset;
      `,
      SpecialCharacterToolWrapper: css`
        position: fixed;
        top: unset;
      `,
    },
  },
}
