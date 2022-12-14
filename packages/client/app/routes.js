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

const regexPaths = [
  {
    path: /^\/dashboard$/,
    name: 'Dashboard',
  },
]

const Layout = props => {
  const { children } = props

  const history = useHistory()

  useEffect(() => {
    const title = regexPaths.find(p => p.name)

    document.title = `${title?.name} - CokoDocs`

    const unlisten = history.listen(val => {
      const pathTitle = regexPaths.find(p => p.name)

      document.getElementById('page-announcement').innerHTML = pathTitle?.name

      document.title = `${pathTitle?.name} - Coko Docs`
    })

    return unlisten
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

  @media screen and (min-width: 720px) {
    height: calc(100% - 76px - 60px);
  }
`

// const Loader = () => <Spin spinning />

const SiteHeader = () => {
  const headerLinks = {
    homepage: '/',
    dashboard: '/dashboard',
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

const StyledMain = styled.main`
  height: 100%;
`

const routes = (
  <Layout>
    <GlobalStyles />
    <SiteHeader />
    <StyledPage fadeInPages={false} padPages={false}>
      <StyledMain id="main-content" tabIndex="-1">
        <Switch>
          <Route
            exact
            path={['/dashboard', '/dashboard/:docIdentifier']}
            render={() => <Dashboard />}
          />
          <Route component={() => <Redirect to="/dashboard" />} path="*" />
        </Switch>
      </StyledMain>
    </StyledPage>
  </Layout>
)

export default routes
