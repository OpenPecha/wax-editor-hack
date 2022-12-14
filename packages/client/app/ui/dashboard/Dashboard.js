import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import PmEditor from '../wax/PmEditor'

const Wrapper = styled.div`
  height: 100%;

  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
`

const Dashboard = props => {

  const { docIdentifier } = useParams();
  
  return (
    <Wrapper > <PmEditor docIdentifier={docIdentifier} /> </Wrapper>
  )
}

Dashboard.propTypes = {
}

Dashboard.defaultProps = {
}

export default Dashboard
