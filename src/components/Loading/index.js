import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = () => (
  <div style={{textAlign: 'center', marginTop: window.parent.screen.height / 4}}>
    <h1>Cheeewing!</h1>
    <CircularProgress
      size={120}
      thickness={5}
    />
  </div>
)

export default Loading
