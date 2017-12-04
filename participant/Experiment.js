import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardText } from 'material-ui/Card'

import { nextQuestion } from './actions'

import DnD from './DnD'
import EndQuestion from './EndQuestion'
import EvaluationAxis from 'util/EvaluationAxis'
import Subjects from 'util/Subjects'

const mapStateToProps = ({ sequence, qswap, question_text }) => ({
  sequence, qswap, question_text
})

let DnDResult = new Array()
let arrayResult    = new Array()
let Num = 0
let ResultCounter = 0
const SUBJECT_LENGTH = Subjects.length

class Experiment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataBarn = this.dataBarn.bind(this)
  }

   dataBarn(array) {
    DnDResult[Num] = new Array()
    DnDResult[Num] = JSON.parse(JSON.stringify(array))
    if(Num < EvaluationAxis.length + 1 ){
      this.setState(DnDResult)
    }
    if(Num == EvaluationAxis.length){
      for(let i=0; i<=EvaluationAxis.length; i++){
        for(let d=0; d<SUBJECT_LENGTH; d++){
          arrayResult[ResultCounter] = DnDResult[i][d][1]
          ResultCounter++
        }
      }
    }
    Num++
   }

  next(value) {
    const{ dispatch } = this.props
    dispatch(nextQuestion(value))
    this.setState({
      slideIndex: 1
    })
  }
  
  render() {
    const { sequence, qswap, question_text, manyTypeData } = this.props
    const Question = question_text["question"]
    const Text = question_text[sequence]
    return (sequence != "answered")?
      <div>
        <Card>
          {Num <= EvaluationAxis.length ?
            <DnD 
              Num = {Num}
              dataBarn= {this.dataBarn}
            />
            :<EndQuestion 
              arrayResult={arrayResult}
              manyTypeData = {manyTypeData}
            />
          }
        </Card>
      </div>
    : <Card><CardText>{Text.text.split('\n').map( line => <p>{line}</p>)}</CardText></Card>
  }
}

export default connect(mapStateToProps)(Experiment)
