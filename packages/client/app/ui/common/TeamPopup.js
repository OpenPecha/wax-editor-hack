import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TeamOutlined } from '@ant-design/icons'
import { BlockPicker } from 'react-color'
import { th } from '@coko/client'
import YjsContext from '../../yjsProvider'
import Button from './Button'

const StyledButton = styled(Button)`
  background: none;
  border: none;
  color: ${th('colorText')};
  display: inline-block;
  font-size: inherit;
  font-weight: 700;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  transition: none;

  &:hover,
  &:focus {
    span {
      color: ${th('colorText')};

      &::after {
        transform: translateX(0);
      }
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    line-height: 1.5;
    padding: 0;

    span::after {
      background-color: ${th('colorText')};
    }
  }
`

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

const TeamPopup = ({
  onLogout
}) => {

  const [open, toggle] = useState(false)
  const [openColorPicker, toggleColorPicker ] = useState(false)

  const { sharedUsers, updateLocalUser, yjsCurrentUser } = useContext(YjsContext)

  return (
    <>
      <TeamOutlinedStyled onClick={() => toggle(!open)} />
      <TeamWrapper>
        {open && (
          <Popup>
            <MyUser>
              <StyledButton
                data-testid="logout-btn"
                onClick={() => {
                  onLogout()
                }}
              >
                Logout
              </StyledButton>
              <UsernameText 
                onChange={(current) => {
                  updateLocalUser({ displayName: current.target.value, color: yjsCurrentUser.color })
                }}
                type="text" value={yjsCurrentUser.displayName}
              />
              <ColoredCircle color={yjsCurrentUser.color} onClick={() => toggleColorPicker(!openColorPicker)} size="35px" /> 
              {openColorPicker && (
                <ColorBlock>
                  <BlockPicker  color={yjsCurrentUser.color} onChangeComplete={(color) => {
                    updateLocalUser({ displayName: yjsCurrentUser.displayName, color: color.hex })
                  }} />
                </ColorBlock>
              )}
            </MyUser>
            <OtherUsers>
              <ul>
                {sharedUsers
                  .filter(([id, {user}]) => user.id !== yjsCurrentUser.id)
                  .map(([id, {user}]) => <li key={user.id}><ColoredCircle color={user.color} size="35px" /> <span>{user.displayName}</span> </li>)}
              </ul>
              </OtherUsers>
          </Popup>
        )} 
      </TeamWrapper>
    </>
  )
}

TeamPopup.propTypes = {
  onLogout: PropTypes.func,
}

TeamPopup.defaultProps = {
  onLogout: () => {},
}

export default TeamPopup
