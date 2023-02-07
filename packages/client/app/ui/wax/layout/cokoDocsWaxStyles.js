import { css } from 'styled-components'
import { th } from '@coko/client'

export default css`
  *:focus:not(.ProseMirror) {
    outline: 1px solid ${th('colorPrimary')};
  }

  .ProseMirror {
    --mono: 0; 
    --casl: 0; 
    --wght: 300; 
    --slnt: 1; 
    --crsv: 0.7;
    padding: 3em 16ch 3em;
    font-variation-settings:  "MONO" var(--mono), "CASL" var(--casl),  "slnt" var(--slnt), "CSRV" var(--crsv);
    font-family: '${th('fontContent')}';
    font-size: ${th('fontSizeBase')};
    font-weight: 400;

  }
  .ProseMirror-selectednode {
    outline: 2px solid ${th('colorPrimary')};
  }

  .ProseMirror ::selection {
    background-color: ${th('colorSelection')};
    color: #000;
  }

  .ProseMirror ol {

    counter-reset: item
  }

  .ProseMirror ol li {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .ProseMirror ol li p {
    display: inline;
  }

  .ProseMirror ol li:before {
    content: counters(item, ".") ". ";
    counter-increment: item
  }




  /*custom styles for the text*/

.ProseMirror > * {
    position: relative;
    line-height: 1.4;

}

.ProseMirror {
width: 1200px;
font-size: .95em;
}

/*heading*/

.ProseMirror h1 {
font-size: 2.2em;
font-weight: 600;
line-height: 1.2;
padding-bottom:.4em;
margin-bottom: 1em;
border-bottom: 2px solid ${th('colorPrimary')};
}
.ProseMirror h1:first-child {
margin-top:2em;
}

.ProseMirror h2 {
font-size: 1.8em;
font-weight: 700;
}


.ProseMirror h3 {
font-size: 1.5em;
font-weight: 700;
}

.ProseMirror h4 {
font-size: 1.2em;
font-weight: 700;
}

.ProseMirror h5 {
font-size: 1em;
}


.ProseMirror h6 {
font-size: .9em;
text-transform: uppercase;
.9em;
}

.ProseMirror :is(h2,h3,h4,h5,h6) {
margin-top: 1.7em;
margin-bottom: .4em;
line-height: 1.3;
}

.ProseMirror p { 
font-size: 1.05em;
max-width: 80ch;
line-height: 1.5 }


.ProseMirror :is(h1,h2,h3,h4,h5,h6):before {
    --casl: 1;
  --slnt: 1;
    font-variation-settings:  "MONO" var(--mono), "CASL" var(--casl),  "slnt" var(--slnt), "CSRV" var(--crsv); 
    color: ${th('colorPrimary')};
    text-transform: lowercase;
    position: absolute;
    left: -5ch;
    top: .4rem;
    font-weight:400;
    font-size: 1rem;
    display: inline-block;
    display: none;
}

.ProseMirror :is(h2 + h3, h3 + h4, h4+h5, h5+h6) {
margin-top: 0.5em;
}


.ProseMirror em {
font-style: italic;
--slnt: -15;
font-weigth: 450;
    /*font-variation-settings:  "MONO" var(--mono), "CASL" var(--casl),  "slnt" var(--slnt), "CSRV" var(--crsv);*/ 
}

.ProseMirror h1::before {
    content: "h1 ";
}


.ProseMirror h2 {
    font-weight: 500;
    font-variation-settings:  "MONO" var(--mono), "CASL" var(--casl),  "slnt" var(--slnt), "CSRV" var(--crsv); 
}

.ProseMirror h2::before {
    content: "h2 ";
}



.ProseMirror h3 {
font-weight: 400;
    font-variation-settings:  "MONO" var(--mono), "CASL" var(--casl), "slnt" var(--slnt), "CSRV" var(--crsv); 
}

.ProseMirror h3::before {
    content: "h3 ";
}


.ProseMirror blockquote {
margin: 1em 0 1em 0ch;
border-left: 4px solid ${th('colorPrimary')};
padding-left: 2ch;
}

.ProseMirror .small-caps {
  --casl:0;
  font-weight: 450;
  letter-spacing: .05ch;
  
  font-variant: all-small-caps !important;
}

.ProseMirror .highlight {
    background: 200%;
}

.ProseMirror ul li::marker  {
content: "—  ";
margin-left: -1ch;
color: ${th('colorPrimary')}
}

.ProseMirror :is(ul,ol) {  
  margin-left: 0ch;
  padding-left: 3ch;
  list-style-position: outside;
}


.ProseMirror a {
color: inherit;
text-decoration-color: ${th('colorPrimary')};
text-decoration: underline;
text-decoration-thickness: 2px;
text-underline-offset: 3px;
}
.ProseMirror a:hover {
color: ${th('colorPrimary')};
}


.ProseMirror {

  table {
    border: 3px solid ${th('colorContent')};
    font-size: .9em;
  }

  table p {
    margin:0;
    line-height: 1.2;
    font-size: 1em;
    margin-bottom: 0.3ch;
  }

table tr:nth-of-type(odd) {
background: ${th('colorLightGrey')}

}

table tr {border-bottom: 2px solid ${th('colorContent')}}

table p:empty {
margin: 0;
}

  table td, th {
    border: 1px solid ${th('colorContent')};
    padding: 1em 1ch;
  }

table th {
text-align:left;
padding-left: 2ch;
}

  table > tbody > tr > th {
    background-color: ${th('colorReserve')};
    background-color: #e9e9e9;
    color: ${th('colorContent')};
    font-size: 0.9em;
    border:  1px solid  ${th('colorContent')};
  } 

  table > tbody > tr > th > p, table > tbody > tr > td > p {
    margin-bottom: .4em;
  }
}    
`
