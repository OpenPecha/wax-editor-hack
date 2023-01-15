/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react'
import { WaxContext } from 'wax-prosemirror-core'
import { EllipsisOutlined } from '@ant-design/icons'
import styled from 'styled-components'

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

const Menu = styled.div`
    display:flex;
    flex-wrap: wrap;
    height: ${props => props.openMenu === true ? '100%' : '40px'};
    overflow: hidden;
    font-size: 16px;
    div:last-child {
        margin-left:  ${props => props.openMenu === true ? 'unset' : 'auto'};
    }
    width:100%;
`

const MenuToolGroup = styled.div`
    border-right: 1px solid;
    align-items: center;
    display: flex;
    padding: 0 4px;
    height: ${props => props.openMenu === true ? '100%' : '40px'};
    button {
        margin: 0 5px;
    }

    @media screen and (min-width: 1050px) {
        height: 40px; 
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

const MenuComponent = () => {
    const {  app, activeView  } = useContext(WaxContext)
    const [open, toggleMenu] = useState(false)

    const showMore = () => {
        toggleMenu(!open)
    }
        
    const Base = app.container.get('Base')

    // const BlockDropDown = app.container.get('BlockDropDown')
    const Annotations = app.container.get('Annotations')
    const HighlightToolGroup = app.container.get('HighlightToolGroup')
    const TransformToolGroup = app.container.get('TransformToolGroup')
    const Lists = app.container.get('Lists')
    const Images = app.container.get('Images')
    const SpecialCharacters = app.container.get('SpecialCharacters')
    const Tables = app.container.get('Tables')
    const FindAndReplaceTool = app.container.get('FindAndReplaceTool')
    const FullScreen = app.container.get('FullScreen')
    
return (<MenuWrapper><Menu openMenu={open}>
    <MenuToolGroup>{Base._tools.filter(tool => tool.name !== 'Save').map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    {/* <MenuToolGroup>{BlockDropDown._tools.filter(tool => tool.name !== 'Save').map(tool => tool.renderTool(activeView))}</MenuToolGroup> */}
    <MenuToolGroup>{Annotations._tools.filter(tool => tool.name !== 'Code').map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{HighlightToolGroup._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{TransformToolGroup._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{Lists._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{Images._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{SpecialCharacters._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{Tables._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{FindAndReplaceTool._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    <MenuToolGroup>{FullScreen._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
    </Menu>
    <ShowMore onClick={showMore} />
    
    </MenuWrapper>)
}

 export default MenuComponent