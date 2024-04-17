/* stylelint-disable max-line-length */
/* stylelint-disable declaration-no-important */
import { css } from 'styled-components'
import { th } from '@coko/client'
import '@fontsource/montserrat'
import '@fontsource/montserrat/variable.css'

export default css`

@media print {

div {
background: white !important;
}



.ProseMirror,  
.layout__EditorContainer , body {
background: white !important;

}
  :root {
    /* colors  */
    --color-body: black;
    --color-lightgrey: #fafafa;
    --color-grey: #aaa;
    --color-primary: darkblue;

    /* fonts  */
    --font-serif: 'times';
    --font-sans: 'Montserrat';
  }

  @page {
    margin: 13mm 14mm 18mm 14mm;
    @bottom-left {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      content: string(documenttitle);
      text-transform: uppercase;
      font-size: 0.8em;
      letter-spacing: 0.05ch;
    }
    @bottom-right {
      content: counter(page) '/' counter(pages);
      width: 3ch;
      color: var(--color-grey);
    }
  }

  h1 {
    string-set: documenttitle content(text);
  }

  body {
  position: relative;
    font-size: 0.8em;
    color: var(--color-body);
    font-family: var(--font-sans);
    font-weight: 400;
    height: unset !important;
    width: auto;
    max-width: unset;
  }

  /* //list  */

  ol > li p {
    display: inline;
  }

  /*custom styles for the text*/

  h1 {
    font-size: 2.2em;
    font-weight: 600;
    line-height: 1.2;
    padding-bottom: 0.4em;
    margin-bottom: 1em;
    border-bottom: 2px solid var(--color-primary);
  }

  h2 {
    font-size: 1.8em;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 700;
  }

  h4 {
    font-size: 1.2em;
    font-weight: 700;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 0.9em;
    text-transform: uppercase;
  }

  :is(h2, h3, h4, h5, h6) {
    margin-top: 1.7em;
    margin-bottom: 0.4em;
    line-height: 1.3;
  }

  p {
    font-size: 1.05em;
    max-width: 80ch;
    line-height: 1.5;
  }

  :is(h1, h2, h3, h4, h5, h6):before {
    color: var(--color-primary);
    text-transform: lowercase;
    position: absolute;
    left: -5ch;
    top: 0.4rem;
    font-weight: 400;
    font-size: 1rem;
    display: none;
  }

  /* :is(h2 + h3, h3 + h4, h4 + h5, h5 + h6) { */
  /*   margin-top: 0.5em; */
  /* } */

  em {
    font-style: italic;
    font-weigh: 450;
  }

  h1::before {
    content: 'h1 ';
  }

  h2 {
    font-weight: 500;
    font-variation-settings: 'MONO' var(--mono), 'CASL' var(--casl),
      'slnt' var(--slnt), 'CSRV' var(--crsv);
  }

  h2::before {
    content: 'h2 ';
  }

  h3 {
    font-weight: 400;
    font-variation-settings: 'MONO' var(--mono), 'CASL' var(--casl),
      'slnt' var(--slnt), 'CSRV' var(--crsv);
  }

  h3::before {
    content: 'h3 ';
  }

  blockquote {
    margin: 1em 0 1em 0ch;
    border-left: 4px solid var(--color-primary);
    padding-left: 2ch;
  }

  .small-caps {
    font-weight: 450;
    letter-spacing: 0.05ch;
    font-variant: all-small-caps !important;
  }

  ol,
  ul {
    margin-left: 0ch;
    padding-left: 3ch;
    list-style-position: outside;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  ul li::marker {
    content: '—  ';
  }

  ol li::marker {
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--color-primary);
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  table {
    border: 3px solid var(--color-body);
    font-size: 0.9em;
    border-collapse: collapse;
    /*l content: '—  '; */
  }

  table p {
    margin: 0;
    line-height: 1.2;
    font-size: 1em;
    margin-bottom: 0.3ch;
  }

  table tr:nth-of-type(odd) {
    background: var(--color-lightgrey);
  }

  table tr {
    border-bottom: 2px solid var(--color-body);
  }

  table p:empty {
    margin: 0;
  }

  table td,
  th {
    border: 1px solid var(--color-body);
    padding: 1em 1ch;
  }

  table th {
    text-align: left;
    padding-left: 2ch;
  }

  table > tbody > tr > th {
    background-color: #e9e9e9;
    color: var(--color-body);
    font-size: 0.9em;
    border: 1px solid var(--color-body);
  }

  table > tbody > tr > th > p,
  table > tbody > tr > td > p {
    margin-bottom: 0.4em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    break-after: avoid;
  }
  figure {
    /* display: flex;flex-direction:column; */
    align-items: space-around;
    /* flex: 1 1 0; */
  }
  figure img {
    margin: 0 auto;
  }
  figure figcaption {
    text-align: center;
  }
  figure figcaption:before {
    content: 'Fig. ';        margin: 0 auto;

    text-transform: uppercase;
    color: var(--color-primary);
  }
}    
  
`
