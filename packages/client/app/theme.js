/* eslint-disable import/no-import-module-exports */
import { css } from 'styled-components'

export default {
  colorBackground: 'white',
  colorPrimary: '#525E76',
  colorSecondary: '#E7E7E7',
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

  fontInterface: 'Montserrat',
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
      CommentName: css`
        font-size: 14px
      `,
      CommentTimestamp: css`
        font-size: 12px;
      `,
      CommentContent: css`
        font-size: 16px;
      `,
      CommentTextArea: css`
        font-size: 14px;
        border: 1px solid gainsboro;
      `,
      CommentButtons: css`
        font-size: 14px;
      `,
      CommentButtonGroup: css`
      `,
      TransformToolWrapper: css`
        position: fixed;
        top: unset;
      `,
      HighlightToolWrapper: css`
        position: fixed;
        top: unset;
      `,
      SpecialCharacterToolWrapper: css`
        position:fixed;
        top: unset;
      `
    },
  }
}
