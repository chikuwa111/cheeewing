import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = () => (
  <div style={{textAlign: 'center'}}>
    <h1>Cheeewing!</h1>
    <CircularProgress
      size={120}
      thickness={5}
    />
  </div>
)

export default Loading
