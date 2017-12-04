import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { fetchContents } from './actions'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

import Pages from './Pages'

const mapStateToProps = ({ loading, active }) => ({
  loading,
  active
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, active } = this.props
    var text = ReadJSON().static_text
    if (loading) {
      return (
	<Card style={{padding: '20px'}}>
		<CardTitle title={text["connecting"][0]} style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
		<CardText style={{padding: '0px', margin: '0px'}}>
			<div style={{textAlign: 'center'}}>
				<CircularProgress style={{margin: '0px', padding: '0px' }} />
			</div>
    		<p style={{margin: '0px', padding: '0px'}}>{LineBreak(text["connecting"][1])}</p>
		</CardText>
	</Card>
      )
    } else if(active) {
      return (
        <div>
          <Pages />
        </div>
      )
    } else {
      return (
        <div>
          <p>{LineBreak(text["end"])}</p>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
