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
import Ranking from './components/Ranking'

const Header = () => (
  <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <span><Link to='/cheeewing'>Home</Link></span>
    <span><Link to='/cheeewing/chew'>Cheeew!</Link></span>
    <span><Link to='/cheeewing/ranking'>Ranking</Link></span>
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
                  <Route exact path='/cheeewing' render={() => <Home {...this.state} />}/>
                  <Route path='/cheeewing/chew' render={() => <ChewCounter {...this.state} />}/>
                  <Route path='/cheeewing/ranking' render={() => <Ranking {...this.state} />}/>
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