/* eslint-disable import/no-duplicates */
/* stylelint-disable string-quotes */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
// import { DownOutlined, UpOutlined } from '@ant-design/icons'
import logoMobile from '../../../static/cokoDocs-logo-alt.png'
import logo from '../../../static/cokoDocs-logo-alt.png'

// #region styles
const StyledHeader = styled.header`
  align-items: center;
  background-color: ${th('colorBody')};
  /* box-shadow: -5px 5px 18px -2px ${th('colorText')}; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: ${th('headerPaddingVertical')} ${th('headerPaddingHorizontal')};
  width: 100%;
  z-index: 9;

  /* @media screen and (min-width: ${th('mediaQueries.medium')}) {
    flex-direction: column;
  } */

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    flex-direction: row;
    /* height: 110px; */
    justify-content: unset;
  }
`

const Branding = styled(Link)`
  background-image: ${`url(${logoMobile})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80px ${th('mobileLogoHeight')};
  display: block;
  height: ${th('mobileLogoHeight')};
  margin-right: 30px;
  overflow: hidden;
  transition: outline 200ms ease-in;
  width: 95px;

  @media screen and (min-width: ${th('mediaQueries.small')}) {
    background-image: ${() => `url(${logo})`};
    background-size: 332px ${th('mobileLogoHeight')};
    width: 340px;
  }

  /* @media screen and (min-width: ${th('mediaQueries.medium')}) {
    background-image: ${() => `url(${logo})`};
    background-size: 332px 84px;
    height: 84px;
    width: 332px;
  } */

  h1 {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  &:hover,
  &:focus {
    outline: 1px solid ${th('colorTextReverse')};
  }
`

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-basis: 40px;
  height: ${th('mobileLogoHeight')};
  justify-content: center;
  overflow: visible;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: ${th('colorBody')};
    flex-grow: 1;
    /* height: auto; */
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }
`

const StyledList = styled.ul`
  display: block;
  margin: 0;
  padding: 0;

  li {
    align-items: center;
    color: ${th('colorTextDark')};
    display: flex;
    font-size: ${th('fontSizeBase')};
    line-height: 2.5rem;
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    align-items: start;
    display: flex;
    height: 3.0625rem;
    padding: ${grid(3)} 0 0 0;

    li {
      align-items: center;
      color: ${th('colorTextReverse')};
      display: inline-flex;
      line-height: inherit;

      &:not(:first-child:last-child) {
        margin-right: 1rem;
      }
    }
  }
`

const NavLinks = styled.div`
  background-color: ${th('colorBackground')};
  display: none;
  height: calc(
    100vh - (${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')})
  );
  left: 0;
  overflow: auto;
  padding: ${grid(6)} ${grid(4)}; // 1.5rem 1rem;
  position: absolute;
  top: calc(${th('mobileLogoHeight')} + 2 * ${th('headerPaddingVertical')});
  width: 100%;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    background-color: ${th('colorBody')};
    display: flex;
    height: auto;
    justify-content: space-between;
    left: unset;
    overflow: initial;
    padding: 0;
    position: relative;
    top: unset;
  }
`

const StyledLink = styled(Link)`
  color: inherit;
  display: inline-block;
  font-size: inherit;
  font-weight: 700;
  line-height: 1.25;
  overflow-x: hidden;
  padding: 10px 0;
  text-decoration: none;

  &::after {
    background-color: ${th('colorTertiary')};
    content: '';
    display: block;
    height: 2px;
    margin-top: 0;
    transform: translateX(-101%);
    transition: all 200ms ease-out;
    width: 100%;
  }

  &:hover,
  &:focus,
  &[aria-current='page'] {
    color: inherit;

    &::after {
      transform: translateX(0);
    }
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    line-height: 2;
    padding: 0;

    &::after {
      background-color: ${th('colorTextReverse')};
    }
  }
`

const Separator = styled.hr`
  margin: 0 0 ${grid(4)} 0;
  padding: 0;

  &::after {
    background-color: ${th('colorText')};
  }

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    display: none;
  }
`

const SkipLink = styled.a`
  background-color: ${th('colorTextDark')};
  border-radius: 0 0 ${grid(1)} ${grid(1)};
  color: ${th('colorTextReverse')};
  height: 30px;
  left: 50%;
  padding: ${grid(1)} ${grid(2)};
  position: absolute;
  top: -100px;
  transform: translateX(-50%);
  transition: top 300ms ease-in;
  width: auto;
  z-index: 3;

  &:focus {
    top: 0;
  }
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
      dashboard,
      // lists,
      // about,
      // learning,
    },
    onLogout,
    ...rest
  } = props

  return (
    <StyledHeader role="banner" {...rest}>
      <SkipLink
        // have an href to be valid link
        href="#main-content"
        // focus main element with js to avoid polluting the url with #main-content
        onClick={e => {
          e.preventDefault()
          document.getElementById('main-content').focus()
        }}
      >
        Skip to main content
      </SkipLink>
      <Branding to={homepage}>
        <h1>Coko Docs</h1>
      </Branding>
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
