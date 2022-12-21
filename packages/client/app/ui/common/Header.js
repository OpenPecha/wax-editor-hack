/* eslint-disable import/no-duplicates */
/* stylelint-disable string-quotes */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
// import { DownOutlined, UpOutlined } from '@ant-design/icons'
import logoMobile from '../../../static/cokoDocs-logo-alt.png'
import logo from '../../../static/cokoDocs-logo-alt.png'

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

  span {
    font-size: 48px;
  }
`

const UserMenu = styled.div`
  justify-content: flex-end;
`

// #endregion styles

const Header = props => {
  const {
    loggedin,
    canManageUsers,
    canManageTeams,
    currentPath,
    displayName,
    links: {
      homepage,
    },
    onLogout,
    ...rest
  } = props

  return (
    <StyledHeader role="banner" {...rest}>
      <Branding to={homepage}>
        <h1>Coko Docs</h1>
      </Branding>
      <Navigation role="navigation">
        <span>Coko Docs</span>
      </Navigation>
      <UserMenu />
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
