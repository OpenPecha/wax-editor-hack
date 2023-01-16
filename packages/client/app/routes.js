import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout as Page } from '@coko/client'

import GlobalStyles from './globalStyles'
import { Header, VisuallyHiddenElement } from './ui/common'

import { Dashboard } from './pages'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Layout = props => {
  const { children } = props

  useEffect(() => {
    document.title = `CokoDocs`
  }, [])

  return (
    <LayoutWrapper>
      {children}
      <VisuallyHiddenElement
        aria-live="polite"
        as="div"
        id="page-announcement"
        role="status"
      />
    </LayoutWrapper>
  )
}

const StyledPage = styled(Page)`
  height: calc(100% - 76px - 70px);
  
  > div {
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 720px) {
    height: calc(100% - 76px - 60px);
  }
`

const SiteHeader = () => {
  const headerLinks = {
    homepage: '/',
  }

  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)

  useEffect(() => {
    const unlisten = history.listen(val => setCurrentPath(val.pathname))

    return unlisten
  }, [])

  return (
    <Header
      currentPath={currentPath}
      displayName="Anonymous"
      links={headerLinks}
      loggedin
    />
  )
}

// const StyledMain = styled.main`
//   height: 100%;
// `

const routes = (
  <Layout>
    <GlobalStyles />
    <SiteHeader />
    <StyledPage fadeInPages={false} padPages={false}>
      {/* <StyledMain id="main-content" tabIndex="-1"> */}
        <Switch>
          <Route
            exact
            path={['/', '/:docIdentifier']}
            render={() => <Dashboard />}
          />
          <Route component={() => <Redirect to="/" />} path="*" />
        </Switch>
      {/* </StyledMain> */}
    </StyledPage>
  </Layout>
)

export default routes
