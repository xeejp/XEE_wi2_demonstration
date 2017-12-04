import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { Card, CardText } from 'material-ui/Card'

import { nextQuestion } from './actions'

const mapStateToProps = ({ sequence, qswap, question_text }) => ({
  sequence, qswap, question_text
})

class Experiment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  next(value) {
    const{ dispatch } = this.props
    dispatch(nextQuestion(value))
    this.setState({
      slideIndex: 1
    })
  }
  
  render() {
    const { sequence, qswap, question_text } = this.props
    const Question = question_text["question"]
    const Text = question_text[sequence]
    return (sequence != "answered")?
    <Card><CardText>delete comp</CardText></Card>
    : <Card><CardText>{Text.text.split('\n').map( line => <p>{line}</p>)}</CardText></Card>
  }
}

export default connect(mapStateToProps)(Experiment)
