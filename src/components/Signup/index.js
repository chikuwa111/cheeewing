import React from 'react'
import firebase from '../../lib/firebase'
import RaisedButton from 'material-ui/RaisedButton'
import Teeth from '../../teeth.svg'

const Signup = () => {
  const onButtonClicked = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <div>
      <img src={Teeth} alt='logo' />
      <h2>Cheeewing</h2>
      <div>噛むことを楽しむサービスです！</div>
      <div>たくさん噛んで健康になりましょう！</div>
      <div>まずはGoogleアカウントでログイン！</div>
      <RaisedButton
        secondary
        label={'Signup by Google'}
        onClick={onButtonClicked}
        style={{marginTop: 10, marginBottom: 10}}
      />
    </div>
  )
}

export default Signup
