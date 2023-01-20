import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import { EllipsisOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars-2';
import usePrintArea from '../usePrintArea'

import theme from '../../../theme'
import commonStyles from './commonWaxStyles'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import MenuComponent from './MenuComponent'

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  
  font-family: '${th('fontInterface')}';
  font-size: ${th('fontSizeBase')};
  height: calc(100% - ${props => props.menuHeight}px);
  line-height: ${grid(4)};

  width: 100%;

  * {
    box-sizing: border-box;
  }
`;


const EditorArea = styled.div`
  height: 100%;
  background: #f4f4f7;
  width: 100%;
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
  float: left;
  width: 1000px; 
  padding-top: 20px;

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

const MenuWrapper = styled.div`
    display:flex;
    flex-wrap: nowrap;
    flex-direction: row;
    font-size: 16px;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
    
    div:last-child {
        margin-left: auto;
    }
`


const ShowMore = styled(EllipsisOutlined)`
    display: none;
    margin-left: auto;
    font-size: 40px;
    right: 10px;

    @media screen and (max-width: 1050px) {
        display: flex;
        position: relative;
        right: 10px;
        top: 0px;
    }
`

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  position: relative;

  div[data-box] {
    button {
      font-size: 14px;
    }

    span {
      font-size: 11px;
    }
  }

`;

const WaxSurfaceScroll = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 1350px;
  position: relative;
  margin: auto;
`;



const BottomRightInfo = ComponentPlugin('BottomRightInfo');
const RightArea = ComponentPlugin('rightArea');

/* eslint-disable-next-line react/prop-types */
const Layout = ({ editor }) => {
  const {
    pmViews: { main },
  } = useContext(WaxContext);

  const { refElement } = usePrintArea({})

  const ref = useRef(null);
  const [open, toggleMenu] = useState(false)
  const [menuHeight, setMenuHeight] = useState(42)

  useEffect(()=>{
      if (ref.current) {
        setMenuHeight(ref.current.clientHeight + 2)
      }
  }, [open])

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setMenuHeight(ref.current.clientHeight + 2)
      }
    }

    window.addEventListener('resize', handleResize)
  })

  const showMore = () => {
    toggleMenu(!open)
  }

  const { options } = useContext(WaxContext)
  
  const { fullScreen } = options

  let fullScreenStyles = {};

  if (fullScreen) {
    fullScreenStyles = {
      backgroundColor: '#fff',
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
      
      <Wrapper id="wax-container" menuHeight={menuHeight} style={fullScreenStyles}>
        <MenuWrapper>
          {main && <MenuComponent fullScreen={fullScreen} open={open} ref={ref} />}
          <ShowMore onClick={showMore} />
        </MenuWrapper>
        <EditorArea>
          <Scrollbars>
          <WaxSurfaceScroll>
            <div ref={refElement} style={{height: '100%'}}>
            <EditorContainer>{editor}</EditorContainer>
            </div>
            <CommentsContainer>
              <RightArea area="main" />
            </CommentsContainer>
          </WaxSurfaceScroll>
          </Scrollbars>
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

