import React from 'react'
import firebase from '../../lib/firebase'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      total: 0,
      chews: [],
      totalLoading: true,
      chewsLoading: true,
    }
  }

  componentDidMount() {
    const {uid} = this.props.currentUser
    firebase.database().ref(`total/${uid}`).once('value')
    .then((total) => {
      this.setState({
        total: total.val() ? total.val().total : null,
        totalLoading: false,
      })
    })
    firebase.database().ref(`chews/${uid}`).once('value')
    .then((chews) => {
      this.setState({
        chews: chews.val() ? Object.values(chews.val()) : null,
        chewsLoading: false,
      })
    })
  }

  render() {
    const {currentUser} = this.props
    const {
      total,
      chews,
      totalLoading,
      chewsLoading,
    } = this.state
    return (
      <div>
        <h3>{currentUser.displayName}</h3>
        {totalLoading ? (
          <h4>Total Loading</h4>
        ) : (
          total ? (
            <h4>Total: {total}</h4>
          ) : (
            <h4>まだ一回も記録してないみたいだね...</h4>
          )
        )}
        {chewsLoading ? (
          <h4>Chews Loading</h4>
        ) : (
          chews ? (
            <h4>Chews: {chews.join(',')}</h4>
          ) : (
            <h4>まだ一回も記録してないみたいだね...</h4>
          )
        )}
      </div>
    )
  }
}

export default Home
