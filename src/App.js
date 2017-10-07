import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import firebase from './lib/firebase'
import Loading from './components/Loading'
import Signup from './components/Signup'
import Home from './components/Home'
import ChewCounter from './components/ChewCounter'

const Header = () => (
  <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <span><Link to='/'>Home</Link></span>
    <span><Link to='/count'>Count</Link></span>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      currentUser: null,
      loading: true,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({
          currentUser: user,
          loading: false,
        })
      } else {
        this.setState({
          loading: false,
        })
      }
    })
    // firebase.auth().signOut()
  }

  render() {
    const {currentUser, loading} = this.state
    return (
      <MuiThemeProvider>
        <div style={{textAlign: 'center'}}>
          {loading ? (
            <Loading />
          ) : (
            !currentUser ? (
              <Signup />
            ) : (
              <Router>
                <div>
                  <Header />
                  <hr/>
                  <Route exact path='/' render={() => <Home {...this.state} />}/>
                  <Route path='/count' render={() => <ChewCounter {...this.state} />}/>
                </div>
              </Router>
            )
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App