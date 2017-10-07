import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import firebase from './lib/firebase'
import Home from './components/Home'
import Signup from './components/Signup'

const Header = () => (
  <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <span><Link to='/'>Home</Link></span>
    <span><Link to='/signup'>Signup</Link></span>
  </div>
)

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user signed in')
        console.log(user.displayName)
      } else {
        console.log('user not signed in')
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div style={{clear: 'both'}}></div>
          <hr/>

          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={Signup}/>
        </div>
      </Router>
    )
  }
}

export default App