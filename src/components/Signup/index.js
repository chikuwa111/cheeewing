import React from 'react'
import firebase from '../../lib/firebase'

class Signup extends React.Component {
  componentDidMount() {
    firebase.auth().getRedirectResult().then((result) => {
      const user = result.user
      console.log(`Welcome ${user.displayName}!!`)
    }).catch((error) => {
      console.log(error)
    })
  }

  onButtonClicked() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  render() {
    return (
      <button
        onClick={this.onButtonClicked.bind(this)}
      >
        Google Signup
      </button>
    )
  }
}

export default Signup
