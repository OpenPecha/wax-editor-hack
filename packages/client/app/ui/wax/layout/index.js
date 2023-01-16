import React, { useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import MenuComponent from './MenuComponent'

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  
  font-family: '${th('fontInterface')}';
  font-size: ${th('fontSizeBase')};
  height: calc(100% - 42px);
  line-height: ${grid(4)};

  width: 100%;

  * {
    box-sizing: border-box;
  }
`;


const EditorArea = styled.div`
  height: 100%;
  background: #f4f4f7;
  overflow-x: auto;
`;

const WaxBottomRightInfo = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 1px;
  right: 21px;
  z-index: 999;

  span {
    font-size: 14px;
  }

  div div div div {
    width: 235px;
    color: #525E76;
    margin: 0px;
    height: auto;
    padding-bottom: 6px;
  }

`;

const EditorContainer = styled.div`
  height: 100%;
  position: relative;
  width: 1000px;  
  margin: 0 auto;
  padding-top: 40px;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 100%;
    padding: ${grid(10)};

    table > tbody > tr > th {
      background-color: #d3d3d3;
      border: 1px solid ${th('colorBody')};
      color: ${th('colorTextDark')};
    } 

    table > tbody > tr > th > p, table > tbody > tr > td > p {
      margin-bottom: 10px;
      margin-top: 10px !important;
    }
  }

  ${commonStyles}
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;

const BottomRightInfo = ComponentPlugin('BottomRightInfo');
const RightArea = ComponentPlugin('rightArea');

/* eslint-disable-next-line react/prop-types */
const Layout = ({ editor }) => {
  const { options  } = useContext(WaxContext)
  
  const { fullScreen } = options

  let fullScreenStyles = {};

  if (fullScreen) {
    fullScreenStyles = {
      backgroundColor: '#fff',
      height: '100%',
      left: '0',
      margin: '0',
      padding: '0',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: '99999',
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <MenuComponent/>
      <Wrapper id="wax-container" style={fullScreenStyles}  >
        {fullScreen && <MenuComponent/>}
        <EditorArea>
          <EditorContainer>{editor}</EditorContainer>
          <CommentsContainer>
            <RightArea area="main" />
          </CommentsContainer>
        </EditorArea>
        <WaxBottomRightInfo>
          <InfoContainer id="info-container">
            <BottomRightInfo />
          </InfoContainer>
        </WaxBottomRightInfo>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Layout

