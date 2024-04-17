import React from 'react'
import { useParams } from 'react-router-dom'

import PmEditor from '../wax/PmEditor'

const Dashboard = props => {
  const { docIdentifier } = useParams()

  localStorage.removeItem("nextDocument")

  return <>
  <div style={{height: '40vh', border: '5px solid green', margin: '10px' }}>
    one
    <PmEditor docIdentifier={docIdentifier} primary={true} />
  </div>  
  <div style={{height: '40vh', border: '5px solid blue', margin: '10px' }}>
    two
    <PmEditor docIdentifier={docIdentifier} />
  </div>
  </>
}

Dashboard.propTypes = {}

Dashboard.defaultProps = {}

export default Dashboard
