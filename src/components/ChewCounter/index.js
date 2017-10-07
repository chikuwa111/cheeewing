import React from 'react'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from '../../lib/firebase'
import Teeth from '../../teeth.svg'

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
        })
      }, 1000)
      this.setState({
        auto: true,
      })
    }
  }

  onSubmit() {
    const {count} = this.state
    const {uid, displayName} = this.props.currentUser
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
        {submitted ? (
          <div>
            <h2>よく噛みました！</h2>
            <img src={Teeth} alt='logo' />
          </div>
        ) : (
          <div>
            <h4>噛んだ回数を記録しましょう！</h4>
            <div>Count</div>
            <h1>{count}</h1>
            <RaisedButton
              secondary
              label={'Cheeew!!!'}
              onClick={this.onAddClicked.bind(this)}
              style={{width: '80%', height: 200, marginBottom: 20}}
            />
            <RaisedButton
              label={`${auto ? 'Stop' : 'Start'} AutoMode`}
              onClick={this.toggleAutoIncrement.bind(this)}
            />
            <div>(AutoModeを使うと1秒に1増えます)</div>
            <RaisedButton
              primary
              label={'送信!!!'}
              onClick={this.onSubmit.bind(this)}
              disabled={count === 0}
              style={{marginTop: 20}}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ChewCounter
