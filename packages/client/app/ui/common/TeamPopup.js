import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { TeamOutlined } from '@ant-design/icons'
import { BlockPicker } from 'react-color'
import YjsContext from '../../yjsProvider'

const TeamOutlinedStyled = styled(TeamOutlined)`
  font-size: 30px;
`

const TeamWrapper = styled.div`
  position: absolute;
  direction: rtl;
  z-index: 3;
`

const Popup = styled.div`
  position: absolute;
  background-color: #ffffff;
  height: auto;
  top: 40px;
  padding: 10px;
  border: 1px solid #000;
`

const MyUser = styled.div`
  display: flex;
`

const OtherUsers = styled.div`
  ul {
    direction: ltr;
    padding-left: 0px;
  }

  ul > li {
    display:flex;
    margin-bottom: 5px;
  }

  ul > li > span {
    padding-left: 10px;
  }
`

const ColoredCircle = styled.div`
  border-radius: 50%;
  border: 1px solid #000;
  width: ${props => props.size};
  height: ${props => props.size}; 
  background-color: ${props => props.color};
`

const UsernameText = styled.input`
  height: 35px;
  margin-left: 10px;
  direction: ltr;
  margin-right: 10px;
  width: 200px;
`

const ColorBlock = styled.div`
  position: absolute;
  top: 75px;
  left: -50px;
`

const TeamPopup = () => {

  const [open, toggle] = useState(false)
  const [openColorPicker, toggleColorPicker ] = useState(false)

  const { sharedUsers, updateLocalUser, currentUser } = useContext(YjsContext)

  return (
    <>
      <TeamOutlinedStyled onClick={() => toggle(!open)} />
      <TeamWrapper>
        {open && (
          <Popup>
            <MyUser>
              <UsernameText 
                onChange={(current) => {
                  updateLocalUser({ name: current.target.value, color: currentUser.color })
                }}
                type="text" value={currentUser.name}
              />
              <ColoredCircle color={currentUser.color} onClick={() => toggleColorPicker(!openColorPicker)} size="35px" /> 
              {openColorPicker && (
                <ColorBlock>
                  <BlockPicker  color={currentUser.color} onChangeComplete={(color) => {
                    updateLocalUser({ name: currentUser.name, color: color.hex })
                  }} />
                </ColorBlock>
              )}
            </MyUser>
            <OtherUsers>
              <ul>
                {sharedUsers
                  .filter(([id, {user}]) => user.id !== currentUser.id)
                  .map(([id, {user}]) => <li key={user.id}><ColoredCircle color={user.color} size="35px" /> <span>{user.name}</span> </li>)}
              </ul>
              </OtherUsers>
          </Popup>
        )} 
      </TeamWrapper>
    </>
  )
}

TeamPopup.propTypes = {}

TeamPopup.defaultProps = {}

export default TeamPopup
