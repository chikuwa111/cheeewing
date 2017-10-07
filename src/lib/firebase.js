import firebase from 'firebase'

const initializeFirebase = () => {
  const config = {
    apiKey: 'AIzaSyDxx9BFLTEB7puawNvGNSj1lajtg6WZOec',
    authDomain: 'cheeewing-e76f6.firebaseapp.com',
    databaseURL: 'https://cheeewing-e76f6.firebaseio.com',
    projectId: 'cheeewing-e76f6',
    storageBucket: 'cheeewing-e76f6.appspot.com',
    messagingSenderId: '486843478411',
  }
  firebase.initializeApp(config)
  return firebase
}

const fb = initializeFirebase()
export default fb
