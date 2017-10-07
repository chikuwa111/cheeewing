import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import firebase from '../../lib/firebase'
import Loading from '../../components/Loading'

class Ranking extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      ranking: [],
      loading: true,
    }
  }

  componentDidMount() {
    firebase.database().ref('total').once('value')
    .then((value) => {
      const ranking = Object.values(value.val()).sort((a, b) => {
        if (a.total > b.total) return -1
        if (a.total < b.total) return 1
        return 0
      })
      this.setState({
        ranking,
        loading: false,
      })
    })
  }

  render() {
    const {ranking, loading} = this.state
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Score</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {ranking.map((data, index) => (
                <TableRow key={data.name}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>{data.name}</TableRowColumn>
                  <TableRowColumn>{data.total}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    )
  }
}

export default Ranking
