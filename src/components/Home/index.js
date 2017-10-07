import React from 'react'
import Signup from '../../components/Signup'

const Home = ({currentUser}) => (
  <div>
    <h2>Home</h2>
    <h3>Welcome {currentUser.displayName}!!!</h3>
  </div>
)

export default Home
