import React from 'react'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from '../../lib/firebase'

class ChewCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.autoIncrement = null
  }

  get initialState() {
    return {
      count: 0,
      submitted: false,
      auto: false,
    }
  }

  onAddClicked() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  toggleAutoIncrement() {
    if (this.autoIncrement) {
      clearInterval(this.autoIncrement)
      this.autoIncrement = null
      this.setState({
        auto: false,
      })
    } else {
      this.autoIncrement = setInterval(() => {
        this.setState({
          count: this.state.count + 1,
          auto: true,
        })
      }, 1000)
    }
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
    const {count, submitted, auto} = this.state
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
            <RaisedButton
              label={`${auto ? 'Stop' : 'Start'} AutoMode`}
              onClick={this.toggleAutoIncrement.bind(this)}
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
