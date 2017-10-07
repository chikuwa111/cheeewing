import React from 'react'
import firebase from '../../lib/firebase'
import RaisedButton from 'material-ui/RaisedButton'

const Signup = () => {
  const onButtonClicked = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <div>
      <h3>Cheeewingは、噛むことを促進するサービスです！</h3>
      <h3>たくさん噛んで健康になりましょう！</h3>
      <h3>噛んだ回数を記録・シェアできます！</h3>
      <h3>まずはGoogleアカウントでログインしましょう！</h3>
      <RaisedButton
        label={'Signup by Google'}
        onClick={onButtonClicked}
      />
    </div>
  )
}

export default Signup
