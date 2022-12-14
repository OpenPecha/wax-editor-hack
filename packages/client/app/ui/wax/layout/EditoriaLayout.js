import React, { useContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import {
  WaxContext,
  ComponentPlugin,
} from 'wax-prosemirror-core';
import { grid, th } from '@pubsweet/ui-toolkit';
// import { cokoTheme } from '../theme';
import EditorElements from './EditorElements';
import theme  from '../../../theme'
import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'

const divider = css`
  .panelGroup {
    background: #fff;
  }
  .divider {
    > div {
      background: ${th('colorBorder')};
      height: ${grid(1)};
      max-height: ${grid(1)};

      &:hover {
        height: ${grid(2)};
        max-height: ${grid(2)};
      }
    }
  }
`;

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${grid(4)};
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  overflow: hidden;

  ${divider}

  * {
    box-sizing: border-box;
  }
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const TopMenu = styled.div`
  display: flex;
  min-height: 40px;
  user-select: none;
  background: ${th('colorBackgroundToolBar')};
  border-top: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};

  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
  }

  > div:nth-last-of-type(-n + 2) {
    margin-left: auto;
  }

  > div:last-child {
    margin-left: 0;
    margin-right: ${grid(5)};
  }

  > div[data-name='Tables'] {
    border-right: none;
  }
`;

const SideMenu = styled.div`
  background: ${th('colorBackgroundToolBar')}
  border-right: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  min-width: 250px;
  height: calc(100% - 16px);
`;

const EditorArea = styled.div`
  flex-grow: 1;
`;

const WaxSurfaceScroll = styled.div`
  overflow-y: auto;
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  /* PM styles  for main content*/
  ${EditorElements};
`;

const EditorContainer = styled.div`
  width: 65%;
  height: 100%;

  .ProseMirror {
    box-shadow: 0 0 8px #ecedf1;
    min-height: 98%;
    padding: ${grid(10)};
  }
`;

const WaxBottomRightInfo = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 1px;
  right: 21px;
  z-index: 999;
`;

const LeftSideBar = ComponentPlugin('leftSideBar');
const MainMenuToolBar = ComponentPlugin('mainMenuToolBar');
const BottomRightInfo = ComponentPlugin('BottomRightInfo');

// eslint-disable-next-line react/prop-types
const EditoriaLayout = ({ editor }) => {
  const {
    options,
  } = useContext(WaxContext);

  let fullScreenStyles = {};

  if (options.fullScreen) {
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
      <Wrapper id="wax-container" style={fullScreenStyles}>
        <TopMenu>
          <MainMenuToolBar />
        </TopMenu>

        <Main>
          <SideMenu>
            <LeftSideBar />
          </SideMenu>
          <EditorArea>
              <WaxSurfaceScroll>
                <EditorContainer>{editor}</EditorContainer>
              </WaxSurfaceScroll>
          </EditorArea>
        </Main>
        <WaxBottomRightInfo>
          <InfoContainer id="info-container">
            <BottomRightInfo />
          </InfoContainer>
        </WaxBottomRightInfo>
      </Wrapper>
    </ThemeProvider>
  );
};

export default EditoriaLayout;
