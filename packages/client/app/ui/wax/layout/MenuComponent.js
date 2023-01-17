/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useContext, forwardRef } from 'react'
import { WaxContext } from 'wax-prosemirror-core'

import styled from 'styled-components'
import BlockDropDownComponent from './BlockDropDownComponent'

const Menu = styled.div`
    display:flex;
    flex-wrap: wrap;
    height: ${props => props.openMenu === true ? '100%' : '40px'};
    overflow: hidden;
    font-size: 16px;
    > div:last-child {
        margin-left:  ${props => props.openMenu === true ? 'unset !important' : 'auto'};
        border: none;
    }
    width:100%;
`

const MenuToolGroup = styled.div`
    height: ${props => props.openMenu === true ? '100%' : '40px'};
    border-right: 1px solid;
    align-items: center;
    display: flex;
    padding: 0 4px;
    button {
        margin: 0 5px;
    }

    .Dropdown-menu {
        position: fixed;
        top: unset;
        width: 200px;
        margin-top: 40px;
        margin-left: -40px;
    }

    @media screen and (min-width: 1050px) {
        height: 40px; 
    }
`

const MenuComponent = forwardRef(({ open }, ref) => {
    const { activeView, app  } = useContext(WaxContext)

    const Base = app.container.get('Base')
    const DropDownTools = app.container.get('BlockDropDown')
    const Annotations = app.container.get('Annotations')
    const HighlightToolGroup = app.container.get('HighlightToolGroup')
    const TransformToolGroup = app.container.get('TransformToolGroup')
    const Lists = app.container.get('Lists')
    // const Images = app.container.get('Images')
    const SpecialCharacters = app.container.get('SpecialCharacters')
    const Tables = app.container.get('Tables')
    const FindAndReplaceTool = app.container.get('FindAndReplaceTool')
    const FullScreen = app.container.get('FullScreen')
    
return (
        <Menu openMenu={open} ref={ref}>
            <MenuToolGroup>{Base._tools.filter(tool => tool.name !== 'Save').map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup><BlockDropDownComponent tools={DropDownTools._tools} view={activeView} /></MenuToolGroup>
            <MenuToolGroup>{Annotations._tools.filter(tool => tool.name !== 'Code').map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{HighlightToolGroup._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{TransformToolGroup._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{Lists._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            {/* <MenuToolGroup>{Image._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup> */}
            <MenuToolGroup>{SpecialCharacters._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{Tables._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{FindAndReplaceTool._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
            <MenuToolGroup>{FullScreen._tools.map(tool => tool.renderTool(activeView))}</MenuToolGroup>
        </Menu>
    )
})

 export default MenuComponent