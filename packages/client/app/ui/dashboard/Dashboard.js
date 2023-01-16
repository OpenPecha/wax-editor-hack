import React from 'react'
import { useParams } from 'react-router-dom'

import PmEditor from '../wax/PmEditor'



const Dashboard = props => {

  const { docIdentifier } = useParams();
  
  return (
    <PmEditor docIdentifier={docIdentifier} />
  )
}

Dashboard.propTypes = {
}

Dashboard.defaultProps = {
}

export default Dashboard
