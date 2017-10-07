import React from 'react'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from '../../lib/firebase'

class ChewCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      count: 0,
      submitted: false,
    }
  }

  onAddClicked() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  onSubmit() {
    const {uid, displayName} = this.props.currentUser
    const {count} = this.state
    firebase.database().ref(`chews/${uid}`).push({
      count,
      date: moment().format('HH:mm:ss'),
    })
    firebase.database().ref(`total/${uid}`).once('value')
    .then((value) => {
      const total = value.val() ? value.val().total + count : count
      firebase.database().ref(`total/${uid}`).set({
        total,
        name: displayName,
      })
    })
    this.setState({
      count: 0,
      submitted: true,
    })
  }

  render() {
    const {count, submitted} = this.state
    return (
      <div>
        <div>ChewCounter</div>
        {submitted ? (
          <div>
            <h2>よく噛みました！</h2>
          </div>
        ) : (
          <div>
            <div>Count</div>
            <div>{count}</div>
            <RaisedButton
              secondary
              label={'Cheeew!!!'}
              onClick={this.onAddClicked.bind(this)}
              style={{width: '80%', height: 200}}
            />
            <br/>
            <RaisedButton
              primary
              label={'Submit!!!'}
              onClick={this.onSubmit.bind(this)}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ChewCounter
