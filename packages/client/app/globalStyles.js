/* stylelint-disable max-line-length */
/* stylelint-disable declaration-no-important */
import { createGlobalStyle } from 'styled-components'
import { th } from '@coko/client'
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat";

export default createGlobalStyle`
  
  body {
    font-family: '${th('fontInterface')}';
    line-height: ${th('lineHeightBase')} !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: auto;

    .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
      color: rgb(0 0 0 / 50%);
    }

    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      color: ${th('colorError')};
    }

    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-color: ${th('colorPrimary')};
      box-shadow: 0 0 0 2px #525E76;
    }

    .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
      border-color: ${th('colorError')} !important;
      box-shadow: 0 0 0 2px #d4313122;
    }

    .ant-input:not(.ant-input-status-error):focus,
    .ant-input-focused:not(.ant-input-status-error) {
      border-color: ${th('colorPrimary')};
      box-shadow: 0 0 0 2px #525E76;
    }

    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused {
      border-color: ${th('colorPrimary')};
      box-shadow: 0 0 0 2px #1783872;
    }

    .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:focus,
    .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input-focused,
    .ant-form-item-has-error :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
      border-color: ${th('colorError')};
      box-shadow: 0 0 0 2px #d4313122;
    }
  }
`
