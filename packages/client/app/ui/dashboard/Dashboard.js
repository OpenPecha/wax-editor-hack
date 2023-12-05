import React from 'react'
import { useParams } from 'react-router-dom'

import PmEditor from '../wax/PmEditor'

const Dashboard = props => {
  const { docIdentifier } = useParams()

  localStorage.removeItem("nextDocument")

  return <PmEditor docIdentifier={docIdentifier} />
}

Dashboard.propTypes = {}

Dashboard.defaultProps = {}

export default Dashboard
