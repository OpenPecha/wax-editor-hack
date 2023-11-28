/* eslint-disable import/no-duplicates */
/* stylelint-disable string-quotes */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, useCurrentUser } from '@coko/client'
import { PlusCircleOutlined } from '@ant-design/icons'

import logoMobile from '../../../static/cokoDocs-logo-alt.png'
import logo from '../../../static/cokoDocs-logo-alt.png'
import AboutModal  from '../modals/AboutModal'
import TeamPopup from './TeamPopup'

// #region styles
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: ${th('colorBody')};
  /* box-shadow: -5px 5px 18px -2px ${th('colorText')}; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: ${th('headerPaddingVertical')} ${th('headerPaddingHorizontal')};

  > * {
    flex: 1;
  }
`

const Title = styled.span`
  font-weight: 200;
`

const Beta = styled.span`
  font-size: .8em !important;
  font-weight: 600;
  color: black;
  top: -1em;
  position: relative;
`

const Branding = styled(Link)`
  background-image: ${`url(${logoMobile})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80px ${th('mobileLogoHeight')};
  height: ${th('mobileLogoHeight')};
  margin-right: 30px;
  overflow: hidden;
  transition: outline 200ms ease-in;
  width: 95px;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    background-image: ${() => `url(${logo})`};
    background-size: 135px ${th('mobileLogoHeight')};
    width: 340px;
  }

  h1 {
    height: 0;
    font-family: ${th('fontBrand')};
    font-weight: 600;
    overflow: hidden;
    width: 0;
  }
`

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-basis: 40px;
  height: ${th('mobileLogoHeight')};
  justify-content: center;
  overflow: visible;
  font-family: ${th('fontBrand')};
  span:first-of-type {
  font-size: 3em;
  font-weight: 200;
  }
`

const UserMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CreateNew = styled.span`
  font-size: 30px;
  padding-right: 10px;
`

// #endregion styles

const Header = props => {
  const {
    loggedin,
    canManageUsers,
    canManageTeams,
    currentPath,
    displayName,
    onLogout,
    ...rest
  } = props

  const { currentUser } = useCurrentUser()


  return (
    <StyledHeader role="banner" {...rest}>
      <Branding to="#">
        <h1>CokoDocs</h1>
      </Branding>
      <Navigation role="navigation">
        <Title>CokoDocs</Title>
        <Beta>BETA</Beta>
      </Navigation>
      <UserMenu>
      {currentUser ? (
        <>
          <CreateNew>
            <Link target="_blank" to="/"><PlusCircleOutlined /></Link>
          </CreateNew>
          <AboutModal />
          <TeamPopup onLogout={onLogout} />
        </>    
      ): (
        <AboutModal />
      )}
      </UserMenu>
    </StyledHeader>
  )
}

Header.propTypes = {
  loggedin: PropTypes.bool,
  currentPath: PropTypes.string.isRequired,
  // user: PropTypes.shape(),
  canManageUsers: PropTypes.bool,
  canManageTeams: PropTypes.bool,
  displayName: PropTypes.string,
  links: PropTypes.shape({
    homepage: PropTypes.string,
    questions: PropTypes.string,
    dashboard: PropTypes.string,
    lists: PropTypes.string,
    about: PropTypes.string,
    learning: PropTypes.string,
    manageUsers: PropTypes.string,
    manageTeams: PropTypes.string,
    profile: PropTypes.string,
    login: PropTypes.string,
  }),
  onLogout: PropTypes.func,
}

Header.defaultProps = {
  loggedin: false,
  // user: {},
  canManageUsers: false,
  canManageTeams: false,
  displayName: 'User',
  onLogout: () => {},
  links: {
    homepage: '#',
    questions: '#',
    dashboard: '#',
    lists: '#',
    about: '#',
    learning: '#',
    manageUsers: '#',
    manageTeams: '#',
    profile: '#',
    login: '#',
  },
}

export default Header
