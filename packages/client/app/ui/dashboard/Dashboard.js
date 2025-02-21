import React from 'react'
import { useParams } from 'react-router-dom'

import PmEditor from '../wax/PmEditor'

const Dashboard = props => {
  const { docIdentifier } = useParams()

  localStorage.removeItem("nextDocument")

  return <>
  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',minHeight: '80dvh'}}> 
    <PmEditor docIdentifier={docIdentifier} primary={true} />
  </div>
  </>
}

Dashboard.propTypes = {}

Dashboard.defaultProps = {}

export default Dashboard
