import React from 'react'
import firebase from '../../lib/firebase'

class Ranking extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      list: [],
      loading: true,
    }
  }

  componentDidMount() {
    firebase.database().ref('total').once('value')
    .then((value) => {
      
    })
  }

  render() {
    return (
      <div>Ranking!</div>
    )
  }
}

export default Ranking
