import React from 'react'
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
    const {uid} = this.props.currentUser
    firebase.database().ref(`chews/${uid}`).push({
      count: this.state.count,
      date: new Date(),
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
              style={{width: 120, height: 100}}
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
